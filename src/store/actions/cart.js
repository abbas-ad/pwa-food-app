import axios from "../../foodAxios";
import * as actionTypes from "./actionTypes";

export const showErrorSuccess = (error) => {
  return {
    type: actionTypes.SHOW_ERROR_SUCCESS,
    error,
  };
};

export const cartAddStart = () => {
  return {
    type: actionTypes.ADD_CART_START,
  };
};

export const cartAddSuccess = (cart,order) => {
  return {
    type: actionTypes.ADD_CART_SUCCESS,
    cart,
    order
  };
};

export const cartAddFail = () => {
  return {
    type: actionTypes.ADD_CART_FAIL,
  };
};

export const cartItemRemoveStart = () => {
  return {
    type: actionTypes.REMOVE_CART_ITEM_START,
  };
};

export const cartItemRemoveSuccess = (cart,order) => {
  return {
    type: actionTypes.REMOVE_CART_ITEM_SUCCESS,
    cart,
    order
  };
};

export const cartItemRemoveFail = () => {
  return {
    type: actionTypes.REMOVE_CART_ITEM_FAIL,
  };
};



export const cartFetchStart = () => {
    return {
      type: actionTypes.FETCH_CART_START,
    };
  };
  
  export const cartFetchSuccess = (cart,order) => {
    return {
      type: actionTypes.FETCH_CART_SUCCESS,
      cart,
      order
    };
  };
  
  export const cartFetchFail = () => {
    return {
      type: actionTypes.FETCH_CART_FAIL,
    };
  };

//------------------------

export const addCartItem = (token, restaurantSlug, itemId) => {
    return (dispatch) => {
      dispatch(cartAddStart());
      axios
        .post(
          "/orderItem/addOrderItem",
          { restaurant_slug: restaurantSlug, item_id: itemId },
          {
            headers: { authorization: "Bearer " + token },
          }
        )
        .then((response) => {
          if (response.data.status === "success") {
            dispatch(cartAddSuccess(response.data.card,response.data.order));
          }else{
            dispatch(cartAddFail());
            dispatch(showErrorSuccess(response.data.message));
          }
        })
        .catch((err) => {
          dispatch(cartAddFail());
        });
    };
  };

  export const removeCartItem = (token, orderId, itemId) => {
    return (dispatch) => {
      dispatch(cartItemRemoveStart());
      axios
        .post(
          "/orderItem/reduceOrderItem",
          { order_id: orderId, item_id: itemId },
          {
            headers: { authorization: "Bearer " + token },
          }
        )
        .then((response) => {
          if (response.data.status === "success") {
            dispatch(cartItemRemoveSuccess(response.data.card,response.data.order));
          }else{
          dispatch(cartItemRemoveFail());
            dispatch(showErrorSuccess(response.data.message));
          }
        })
        .catch((err) => {
          dispatch(cartItemRemoveFail());
        });
    };
  };

  export const fetchCart = (token) => {
    return (dispatch) => {
      dispatch(cartFetchStart());
      axios
        .get("/orderItem/getOrderItems", { headers: { authorization: "Bearer " + token },})
        .then((response) => {
          if (response.data.status === "success") {
            dispatch(cartFetchSuccess(response.data.card,response.data.order));
          }else{
            dispatch(cartFetchFail());
            dispatch(showErrorSuccess(response.data.message));
          }
        })
        .catch((err) => {
          //dispatch(orderFail());
        });
    };
  };