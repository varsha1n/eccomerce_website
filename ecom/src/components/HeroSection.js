import React, { useRef } from "react";
import styled from "styled-components";
import { Button } from "../styles/Button";

const HeroSection = () => {
  const shopNowSectionRef = useRef(null);

  const handleShopNowClick = () => {
    if (shopNowSectionRef.current) {
      shopNowSectionRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="grid grid-two-column">
          <div className="hero-section-image">
            <figure>
              <img
                src="images/hero.png"
                alt="hero-section"
                className="img-style"
              />
            </figure>
          </div>
          <div className="hero-section-data">
            <p className="intro-data">The One & Only </p>
            <h1> Sustainable Fashion Store </h1>
            <p>
              Sustainable fashion products merge style with ethics, utilizing
              eco-friendly materials and fair practices. Embracing them
              champions responsible consumption, fostering positive change in
              the industry and environment.
            </p>
            <div id="shop-now-section" ref={shopNowSectionRef}></div>
            <Button onClick={handleShopNowClick}>Shop Now</Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 12rem 0;

  img {
    min-width: 10rem;
    height: 10rem;
  }

  .hero-section-data {
    p {
      margin: 2rem 0;
    }

    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }

    .intro-data {
      margin-bottom: 0;
      color: rgb(34, 139, 34);
      text-transform: capitalize;
      font-weight: bold;
      font-size: 20px;
    }
  }

  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  figure {
    position: relative;

    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color: rgb(34, 139, 34);
      position: absolute;
      left: 50%;
      top: -5rem;
      z-index: -1;
    }

    &:hover,
    &:active {
      box-shadow: 0 2rem 2rem 0 rgb(132 144 255 / 30%);
      box-shadow: ${({ theme }) => theme.colors.shadowSupport};
      transform: scale(0.96);
    }
  }
  .img-style {
    width: 100%;
    height: auto;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      gap: 10rem;
    }

    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      /* bottom: 10%; */
      background-color: rgba(81, 56, 238, 0.4);
    }
  }
`;

export default HeroSection;
