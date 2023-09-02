import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav.js";

const Header = () => {
  return (
    <MainHeader>
      <NavLink to="/">
        <img src="./images/logo.png" alt="my logo img" />
      </NavLink>
      <h1 className="header-title">Eco-Style</h1>
      <Nav />
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 3rem;
  height: 13rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .header-title {
    font-size: 40px;
  }
`;
export default Header;
