import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";

const ProductList = () => {
  const { filter_products, tempFilterProduct, grid_view } = useFilterContext();
  if (tempFilterProduct.length === 0) {
    if (grid_view) {
      return <GridView products={filter_products} />;
    }
  } else {
    if (grid_view) {
      return <GridView products={tempFilterProduct} />;
    }
  }
};

export default ProductList;
