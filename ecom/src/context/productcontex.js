import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/productReducer";

const AppContext = createContext();

const options = {
  method: "GET",
  url: "https://asos2.p.rapidapi.com/products/v2/list",
  params: {
    store: "US",
    offset: "0",
    categoryId: "50598",
    limit: "48",
    country: "US",
    sort: "freshness",
    currency: "USD",
    sizeSchema: "US",
    lang: "en-US",
  },
  headers: {
    "X-RapidAPI-Key": "897b4e1a93msh390b333a31090bdp13651fjsn14a3a770283b",
    "X-RapidAPI-Host": "asos2.p.rapidapi.com",
  },
};

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (options) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.request(options);
      const products = await response.data;
      console.log(products);
      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  useEffect(() => {
    getProducts(options);
  }, []);

  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};

// custom hooks
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
