import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const TableContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  text-align: center;
  overflow-x: auto;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border: 1px solid #ccc;
  margin: 4px 0;
`;

const History = () => {
  const [cartData, setCartData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/history")
      .then((response) => {
        setCartData(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <TableContainer>
      <h2>History</h2>
      <br />
      {cartData.map((shipment) => (
        <div key={shipment.id}>
          <h3>{new Date(shipment.cartData.purchaseDate).toLocaleString()}</h3>
          {shipment.cartData.cartData.map((item) => (
            <ItemContainer key={item.id}>
              <img
                src={"https://" + item.imageUrl}
                alt={item.name}
                style={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  display: "block",
                }}
              />
              <div>
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </ItemContainer>
          ))}
          <br />
        </div>
      ))}
    </TableContainer>
  );
};

export default History;
