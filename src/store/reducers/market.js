import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  banners: [],
  product: {},
  products: [],
  categories: [],
  bannerLoading: false,
  productsLoading: false,
  categoriesLoading: false,
};

const bannersFetchStart = (state, action) => {
  return updateObject(state, { bannerLoading: true });
};

const bannersFetchSuccess = (state, action) => {
  return updateObject(state, {
    banners: action.banners,
    bannerLoading: false,
  });
};

const categoriesFetchStart = (state, action) => {
  return updateObject(state, { categoriesLoading: true });
};

const categoriesFetchSuccess = (state, action) => {
  return updateObject(state, {
    categories: action.categories,
    categoriesLoading: false,
  });
};

const productsFetchStart = (state, action) => {
  return updateObject(state, { productsLoading: true });
};

const productsFetchSuccess = (state, action) => {
  return updateObject(state, {
    products: action.products,
    productsLoading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BANNER_START:
      return bannersFetchStart(state, action);

    case actionTypes.FETCH_BANNER_SUCCESS:
      return bannersFetchSuccess(state, action);

    case actionTypes.FETCH_MARKET_CATEGORIES_START:
      return categoriesFetchStart(state, action);

    case actionTypes.FETCH_MARKET_CATEGORIES_SUCCESS:
      return categoriesFetchSuccess(state, action);

    case actionTypes.FETCH_PRODUCTS_START:
      return productsFetchStart(state, action);

    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return productsFetchSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
