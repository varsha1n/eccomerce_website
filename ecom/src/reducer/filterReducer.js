const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
      };

    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view: true,
      };

    // case "GET_SORT_VALUE":
    //   let userSortValue = document.getElementById("sort");
    //   let sort_value = userSortValue.options[userSortValue.selectedIndex].value;
    //   console.log(sort_value);
    //   return {
    //     ...state,
    //     sorting_value: sort_value,
    //   };

    // case "SORTING_PRODUCTS":
    //   let newSortData;
    //   let tempSortProduct = [...action.payload];
    //   if (state.sorting_value === "lowest") {
    //     const sortingProducts = (a, b) => {
    //       return a.price.current.value - b.price.current.value;
    //     };
    //     newSortData = tempSortProduct.sort(sortingProducts);
    //   }
    //   if (state.sorting_value === "highest") {
    //     const sortingProducts = (a, b) => {
    //       return b.price.current.value - a.price.current.value;
    //     };
    //     newSortData = tempSortProduct.sort(sortingProducts);
    //   }
    //   if (state.sorting_value === "a-z") {
    //     newSortData = tempSortProduct.sort((a, b) =>
    //       a.name.localeCompare(b.name)
    //     );
    //   }
    //   if (state.sorting_value === "z-a") {
    //     newSortData = tempSortProduct.sort((a, b) =>
    //       b.name.localeCompare(a.name)
    //     );
    //   }
    //   return {
    //     ...state,
    //     filter_products: newSortData,
    //   };

    case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case "FILTER_PRODUCTS":
      let { all_products } = state;
      let tempFilterProduct = [...all_products];
      console.log("Before filtering, tempFilterProduct:", tempFilterProduct);
      const { brandName } = state.filters;
      if (brandName !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.brandName === brandName
        );
      }
      console.log("After filtering, tempFilterProduct:", tempFilterProduct);
      return {
        ...state,
        tempFilterProduct,
      };

    default:
      return state;
  }
};

export default filterReducer;
