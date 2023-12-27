import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  cart: [],
  order: {},
  error: null,
  loading: false,
  addStatus: '',
  removeStatus: '',
};

const addCartStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const addCartSuccess = (state, action) => {
  return updateObject(state, {
    cart: [...action.cart],
    order: {...action.order},
    loading: false,
  });
};

const addCartFail= (state, action) => {
  return updateObject(state, { loading: true });
};

const removeCartItemStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const removeCartItemSuccess = (state, action) => {
  return updateObject(state, {
    cart: [...action.cart],
    order: {...action.order},
    loading: false,
  });
};

const removeCartItemFail= (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchCartStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchCartSuccess = (state, action) => {
  return updateObject(state, {
    cart: [...action.cart],
    order: {...action.order},
    loading: false,
  });
};

const fetchCartFail= (state, action) => {
  return updateObject(state, { loading: false });
};




const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CART_START:
      return addCartStart(state, action);
    case actionTypes.ADD_CART_SUCCESS:
      return addCartSuccess(state, action);
    case actionTypes.ADD_CART_FAIL:
      return addCartFail(state, action);

      case actionTypes.REMOVE_CART_ITEM_START:
      return removeCartItemStart(state, action);
    case actionTypes.REMOVE_CART_ITEM_SUCCESS:
      return removeCartItemSuccess(state, action);
    case actionTypes.REMOVE_CART_ITEM_FAIL:
      return removeCartItemFail(state, action);

      case actionTypes.FETCH_CART_START:
        return fetchCartStart(state, action);
      case actionTypes.FETCH_CART_SUCCESS:
        return fetchCartSuccess(state, action);
      case actionTypes.FETCH_CART_FAIL:
        return fetchCartFail(state, action);
    default:
      return state;
  }
};

export default reducer;