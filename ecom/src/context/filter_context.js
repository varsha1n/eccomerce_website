import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductContext } from "./productcontex";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
  filter_products: [],
  tempFilterProduct: [],
  all_products: [],
  grid_view: true,
  //sorting_value: "lowest",
  filters: {
    brandName: "all",
  },
};

export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };

  //   const sorting = (event) => {
  //     let userValue = event.target.value;
  //     dispatch({ type: "GET_SORT_VALUE", payload: userValue });
  //   };

  const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    console.log(name, value);

    dispatch({
      type: "UPDATE_FILTERS_VALUE",
      payload: { name, value },
    });
  };

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });

    dispatch({ type: "SORTING_PRODUCTS", payload: products });
  }, [products, state.sorting_value, state.filters]);

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{ ...state, setGridView, updateFilterValue }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
