import styled from "styled-components";

import FilterSection from "./FilterSection";
import Sort from "./Sort";
import ProductList from "./ProductList";
import { useFilterContext } from "../context/filter_context";

const FeatureProduct = () => {
  const { tempFilterProduct } = useFilterContext();
  console.log("in feature product", tempFilterProduct);
  return (
    <Wrapper className="section">
      <div className="container grid grid-filter-column">
        <div>
          <FilterSection />
        </div>

        <section className="product-view--sort">
          <div className="sort-filter">
            <Sort />
          </div>
          <div className="main-product">
            <ProductList products={tempFilterProduct} />
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .grid-filter-column {
    grid-template-columns: 0.2fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }
  }
`;

export default FeatureProduct;
