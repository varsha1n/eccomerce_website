import styled from "styled-components";
import { Button } from "../styles/Button";
import axios from "axios";
import { useState } from "react";

var quantity = 1;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const CardContent = styled.div`
  flex-grow: 1;
`;

const CardButton = styled(Button)`
  align-self: center;
  margin-bottom: 1rem;
  padding: 0.8rem 0.8rem;
  font-size: 12px;
`;

const Product = ({ id, name, imageUrl, price, brandName }) => {
  const imageUrlWithHttps = imageUrl.startsWith("https://")
    ? imageUrl
    : "https://" + imageUrl;

  //const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = (id) => {
    axios
      .post(`http://localhost:3001/cart`, {
        productId: id,
        name: name,
        imageUrl: imageUrl,
        price: price.current.value,
        quantity: quantity,
        brandName: brandName,
      })
      .then((response) => {
        console.log("Product added to cart:", response.data);
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  };

  return (
    <Card className="card">
      <figure>
        <img src={imageUrlWithHttps} alt={name} />
      </figure>
      <CardContent>
        <div className="card-data">
          <div className="card-data-flex">
            <h3>{name}</h3>
            <p className="card-data--price">${price.current.value}</p>
          </div>
        </div>
      </CardContent>
      <CardButton
        onClick={() => {
          addToCart(id);
          window.alert("Product added to cart!");
        }}
      >
        Add to Cart
      </CardButton>
    </Card>
  );
};

export default Product;
