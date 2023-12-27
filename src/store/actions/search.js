import axios from "../../foodAxios";
import * as actionTypes from "./actionTypes";

export const filterUpdateSuccess = (page,search,sort,minPrice,maxPrice) => {
  return {
    type: actionTypes.UPDATE_FILTER_SUCCESS,
    page,search,sort,minPrice,maxPrice
  };
};


export const topCategoriesFetchStart = () => {
    return {
      type: actionTypes.FETCH_TOP_CATEGORIES_START,
    };
  };
  
  export const topCategoriesFetchSuccess = (foodCategories,marketCategories) => {
    return {
      type: actionTypes.FETCH_TOP_CATEGORIES_SUCCESS,
      foodCategories,marketCategories
    };
  };
  
  export const topCategoriesFetchFail = () => {
    return {
      type: actionTypes.FETCH_TOP_CATEGORIES_FAIL,
    };
  };

  export const filteredItemsFetchStart = () => {
    return {
      type: actionTypes.FETCH_FILTERED_ITEMS_START,
    };
  };
  
  export const filteredItemsFetchSuccess = (items) => {
    return {
      type: actionTypes.FETCH_FILTERED_ITEMS_SUCCESS,
      items,
    };
  };
  
  export const filteredItemsFetchFail = () => {
    return {
      type: actionTypes.FETCH_FILTERED_ITEMS_FAIL,
    };
  };

export const setFilter = (page,search,sort,minPrice,maxPrice) => {
    return (dispatch) => {
        dispatch(filterUpdateSuccess(page,search,sort,minPrice,maxPrice))
    };
};



export const fetchTopCategories = () => {
    return (dispatch) => {
      dispatch(topCategoriesFetchStart());
      axios
        .get("/category/getTopCategories", {})
        .then((response) => {
          if (response.data.status === "success") {
            dispatch(topCategoriesFetchSuccess(response.data.food_categories,response.data.market_categories));
          }
        })
        .catch((err) => {
          //dispatch(orderFail());
        });
    };
  };



  export const fetchFilteredItems = (search,sort,minPrice,maxPrice) => {
    return (dispatch) => {
      dispatch(filteredItemsFetchStart());
      const query = `?search=${search}&sort=${sort}&min_price=${minPrice}&max_price=${maxPrice}`;
      axios
        .post("/item/getItems"+query,{}, {})
        .then((response) => {
          if (response.data.status === "success") {
            dispatch(filteredItemsFetchSuccess(response.data.items));
          }
        })
        .catch((err) => {
          //dispatch(orderFail());
        });
    };
  };