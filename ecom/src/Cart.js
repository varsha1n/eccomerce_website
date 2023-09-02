import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./components/Product";
import styled from "styled-components";

const CartContainer = styled.div`
  width: 80%; /* Increase the width of the cart box */
  margin: 0 auto;
  text-align: center;
`;

const CartTable = styled.table`
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
`;

const TableHeaderCell = styled.th`
  padding: 16px;
  text-align: center;
  font-size: 18px;
`;

const TableCell = styled.td`
  padding: 16px;
  text-align: center;
  font-size: 16px;
`;

const ProductImage = styled.img`
  max-width: 120px; /* Increase the image size */
  max-height: 120px;
  display: block;
  margin: 0 auto;
`;

const QuantityButton = styled.button`
  background-color: rgb(34, 139, 34); /* Button color */
  color: #fff;
  border: none;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 16px;
`;

const TotalPrice = styled.p`
  font-size: 24px; /* Increase font size */
`;

const ShipButton = styled.button`
  background-color: rgb(34, 139, 34);
  color: #fff;
  border: none;
  border-radius: 10%; /* Make it circular */
  padding: 10px 20px;
  font-size: 24px;
  cursor: pointer;
`;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [shipmentId, setShipmentId] = useState(1);

  const purchaseDate = new Date();

  useEffect(() => {
    axios.get("http://localhost:3001/cart").then((response) => {
      setCartItems(response.data);
    });
  }, []);

  const deleteCartItem = (id) => {
    axios
      .delete(`http://localhost:3001/cart/${id}`)
      .then(() => {
        setCartItems(cartItems.filter((item) => item.id !== id));
        setSuccessMessage("Item removed from cart successfully.");
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage("Error removing item from cart.");
        setSuccessMessage("");
        console.error(error);
      });
  };

  const updateQuantity = (id, newQuantity) => {
    axios
      .patch(`http://localhost:3001/cart/${id}`, {
        quantity: newQuantity,
      })
      .then((response) => {
        setCartItems((prevCartItems) =>
          prevCartItems.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          )
        );
        setSuccessMessage("Quantity updated successfully.");
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage("Error updating quantity.");
        setSuccessMessage("");
        console.error(error);
      });
  };

  const calculateTotalPrice = () => {
    let total = 0;
    for (const cartItem of cartItems) {
      if (cartItem) {
        total += cartItem.price * cartItem.quantity;
      }
    }
    return total;
  };

  const collectCartData = () => {
    const cartData = cartItems.map((cartItem) => {
      return {
        id: cartItem.id,
        imageUrl: cartItem.imageUrl,
        name: cartItem.name,
        price: cartItem.price,
        quantity: cartItem.quantity,
        brandName: cartItem.brandName,
      };
    });

    const totalPrice = calculateTotalPrice();

    return {
      shipmentId,
      cartData,
      totalPrice,
      purchaseDate: purchaseDate.toISOString(),
    };
  };

  const handleShipClick = () => {
    const cartData = collectCartData();

    const historyEntry = {
      cartData,
    };

    axios
      .post("http://localhost:3001/history", historyEntry)
      .then((response) => {
        setShipmentId(shipmentId + 1);
        window.alert(
          "shipped successfully !!! Check History page for previous orders"
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <CartContainer>
      <h1 className="cart-title" style={{ fontSize: "28px" }}>
        Shopping Cart
      </h1>
      <br />
      <CartTable>
        <thead>
          <tr>
            <TableHeaderCell>Image</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            <TableHeaderCell>Quantity</TableHeaderCell>
            <TableHeaderCell>Total</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((cartItem) => {
            if (!cartItem) return null;
            const totalPrice = cartItem.price * cartItem.quantity;

            return (
              <tr key={cartItem.id}>
                <TableCell>
                  <ProductImage
                    src={"https://" + cartItem.imageUrl}
                    alt={cartItem.name}
                  />
                </TableCell>
                <TableCell>{cartItem.name}</TableCell>
                <TableCell>${cartItem.price}</TableCell>
                <TableCell>
                  <QuantityButton
                    onClick={() =>
                      updateQuantity(cartItem.id, cartItem.quantity - 1)
                    }
                  >
                    -
                  </QuantityButton>
                  <span style={{ fontSize: "20px" }}>{cartItem.quantity}</span>
                  <QuantityButton
                    onClick={() =>
                      updateQuantity(cartItem.id, cartItem.quantity + 1)
                    }
                  >
                    +
                  </QuantityButton>
                </TableCell>
                <TableCell>${totalPrice}</TableCell>
                <TableCell>
                  <RemoveButton onClick={() => deleteCartItem(cartItem.id)}>
                    Remove
                  </RemoveButton>
                </TableCell>
              </tr>
            );
          })}
        </tbody>
      </CartTable>
      <TotalPrice>Total Price: ${calculateTotalPrice()}</TotalPrice>
      <br />
      <ShipButton onClick={handleShipClick}>Ship</ShipButton>
    </CartContainer>
  );
};

export default Cart;
