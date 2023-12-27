import axios from "../../foodAxios";
import * as actionTypes from "./actionTypes";

export const showErrorSuccess = (error) => {
  return {
    type: actionTypes.SHOW_ERROR_SUCCESS,
    error,
  };
}; 

export const bannersFetchStart = () => {
  return {
    type: actionTypes.FETCH_BANNER_START,
  };
};

export const bannersFetchSuccess = (banners) => {
  return {
    type: actionTypes.FETCH_BANNER_SUCCESS,
    banners,
  };
};

export const categoriesFetchStart = () => {
  return {
    type: actionTypes.FETCH_MARKET_CATEGORIES_START,
  };
};

export const categoriesFetchSuccess = (categories) => {
  return {
    type: actionTypes.FETCH_MARKET_CATEGORIES_SUCCESS,
    categories,
  };
};

export const productsFetchStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_START,
  };
};

export const productsFetchSuccess = (products) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    products,
  };
};

export const fetchBanners = () => {
  return (dispatch) => {
    dispatch(bannersFetchStart());
    axios
      .get("/banner/getBanners")
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(bannersFetchSuccess(response.data.data));
        }else{
          dispatch(showErrorSuccess(response.data.message));
        }
      })
      .catch((err) => {
        //dispatch(orderFail());
      });
  };
};

export const fetchMarketCategories = () => {
  return (dispatch) => {
    dispatch(categoriesFetchStart());
    axios
      .post("/menu/getMarketCategories")
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(categoriesFetchSuccess(response.data.data));
        }else{
          dispatch(showErrorSuccess(response.data.message));
        }
      })
      .catch((err) => {
        //dispatch(orderFail());
      });
  };
};

export const fetchProducts = (query,menuId) => {
  return (dispatch) => {
    dispatch(productsFetchStart());
    axios
      .post("/item/getItems"+query, {restaurant_slug: "0",menu_id: menuId})
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(productsFetchSuccess(response.data.items));
        }else{
          dispatch(showErrorSuccess(response.data.message));
        }
      })
      .catch((err) => {
        //dispatch(orderFail());
      });
  };
};
