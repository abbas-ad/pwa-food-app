import axios from "../../foodAxios";
import * as actionTypes from "./actionTypes";

export const showErrorSuccess = (error) => {
  return {
    type: actionTypes.SHOW_ERROR_SUCCESS,
    error,
  };
};
const recommendedItemFetchStart = () => {
  return {
    type: actionTypes.FETCH_RECOMMENDED_ITEM_START,
  };
};
const recommendedItemFetchSuccess = (items) => {
  return {
    type: actionTypes.FETCH_RECOMMENDED_ITEM_SUCCESS,
    items
  };
};
const recommendedItemFetchFail = () => {
  return {
    type: actionTypes.FETCH_RECOMMENDED_ITEM_FAIL,
  };
};


const paymentStart = () => {
    return {
      type: actionTypes.PAYMENT_START,
    };
  };
  const paymentSuccess = (result) => {
    return {
      type: actionTypes.PAYMENT_SUCCESS,
      result
    };
  };
  const paymentFail = () => {
    return {
      type: actionTypes.PAYMENT_FAIL,
    };
  };

  const ordersFetchStart = () => {
    return {
      type: actionTypes.FETCH_ORDERS_START,
    };
  };
  const ordersFetchSuccess = (orders) => {
    return {
      type: actionTypes.FETCH_ORDERS_SUCCESS,
      orders
    };
  };
  const ordersFetchFail = () => {
    return {
      type: actionTypes.FETCH_ORDERS_FAIL,
    };
  };

  const saveOrderInfoStart = () => {
    return {
      type: actionTypes.SAVE_ORDER_INFO_START,
    };
  };
  const saveOrderInfoSuccess = (result) => {
    return {
      type: actionTypes.SAVE_ORDER_INFO_SUCCESS,
      result
    };
  };
  const saveOrderInfoFail = () => {
    return {
      type: actionTypes.SAVE_ORDER_INFO_FAIL,
    };
  };



  const orderCancelStart = () => {
    return {
      type: actionTypes.CANCEL_ORDER_START,
    };
  };
  const orderCancelSuccess = (result) => {
    return {
      type: actionTypes.CANCEL_ORDER_SUCCESS,
      result
    };
  };
  const orderCancelFail = () => {
    return {
      type: actionTypes.CANCEL_ORDER_FAIL,
    };
  };


  const followOrderStart = () => {
    return {
      type: actionTypes.FOLLOW_ORDER_START,
    };
  };
  const followOrderSuccess = (result) => {
    return {
      type: actionTypes.FOLLOW_ORDER_SUCCESS,
      result
    };
  };
  const followOrderFail = () => {
    return {
      type: actionTypes.FOLLOW_ORDER_FAIL,
    };
  };


export const fetchRecommendedItems = (token) => {
    return (dispatch) => {
        dispatch(recommendedItemFetchStart())
        axios
        .get("/order/getRecommends",{
          headers: { authorization: "Bearer " + token },
        })
        .then((response) => {
            if(response.data.status === 'success'){
              dispatch(recommendedItemFetchSuccess(response.data.message))
            }else{
              dispatch(recommendedItemFetchFail())
              dispatch(showErrorSuccess(response.data.message));
          }
        })
        .catch((err) => {
          dispatch(recommendedItemFetchFail())
        });
    }
};


export const walletPayment = (token) => {
    return (dispatch) => {
        dispatch(paymentStart())
        axios
        .get("/order/payWithWallet",{
          headers: { authorization: "Bearer " + token },
        })
        .then((response) => {
            if(response.data.status === 'success'){
                dispatch(paymentSuccess(response.data.status))
            }else{
          dispatch(paymentFail())
              dispatch(showErrorSuccess(response.data.message));
              }
        })
        .catch((err) => {
          dispatch(paymentFail())
        });
    }
};

export const inCashPayment = (token) => {
    return (dispatch) => {
        dispatch(paymentStart())
        axios
        .get("/order/payInCash",{
          headers: { authorization: "Bearer " + token },
        })
        .then((response) => {
            if(response.data.status === 'success'){
                dispatch(paymentSuccess(response.data.status))
            }else{
          dispatch(paymentFail())

              dispatch(showErrorSuccess(response.data.message));
              }
        })
        .catch((err) => {
          dispatch(paymentFail())
          
        });
    }
};


export const onlinePayment = (token) => {
    return (dispatch) => {
        dispatch(paymentStart())
        axios
        .get("/order/onlinePayment",{
          headers: { authorization: "Bearer " + token },
        })
        .then((response) => {
            if(response.data.status === 'success'){
                dispatch(paymentSuccess(response.data.status))
            }else{
              dispatch(showErrorSuccess(response.data.message));
          dispatch(paymentFail())

              }
        })
        .catch((err) => {
          dispatch(paymentFail())
          
        });
    }
};

export const resetPaymentResult = () => {
  return (dispatch) => {
    dispatch(paymentSuccess(''))
  }
};


export const fetchOrders = (token) => {
  return (dispatch) => {
      dispatch(ordersFetchStart())
      axios
      .get("/order/getOrders",{
        headers: { authorization: "Bearer " + token },
      })
      .then((response) => {
          if(response.data.status === 'success'){
            dispatch(ordersFetchSuccess(response.data.orders.filter(order=> +order.status != 0)))
          }else{
        dispatch(ordersFetchFail())

          dispatch(showErrorSuccess(response.data.message));
          }
      })
      .catch((err) => {
        dispatch(ordersFetchFail())
      });
  }
};


export const saveOrderInfo = (token,addressId,description) => {
  return (dispatch) => {
    dispatch(saveOrderInfoSuccess(""));
    dispatch(saveOrderInfoStart());
    const body = {location_id: addressId,description };
    axios
      .post(
        "/order/updateOrderInfo",
        { ...body },
        { headers: { authorization: "Bearer " + token } }
      )
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(saveOrderInfoSuccess("success"));
        }else{
        dispatch(saveOrderInfoFail());
          dispatch(showErrorSuccess(response.data.message));
          }
      })
      .catch((err) => {
        dispatch(saveOrderInfoFail());
      });
  };
};


export const cancelOrder = (token) => {
  return (dispatch) => {
      dispatch(orderCancelStart())
      axios
      .get("/order/cancelOrder",{
        headers: { authorization: "Bearer " + token },
      })
      .then((response) => {
          if(response.data.status === 'success'){
            dispatch(orderCancelSuccess(response.data.status))
          }else{
        dispatch(orderCancelFail())

          dispatch(showErrorSuccess(response.data.message));
          }
      })
      .catch((err) => {
        dispatch(orderCancelFail())
      });
  }
};


export const saveFollowOrderInfo = (token,isWrong,isNotDelivered,description) => {
  return (dispatch) => {
    dispatch(followOrderSuccess(""));
    dispatch(followOrderStart());
    const body = {is_wrong: isWrong,is_not_delivered: isNotDelivered,description };
    axios
      .post(
        "/order/saveOrderFollow",
        body,
        { headers: { authorization: "Bearer " + token } }
      )
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(followOrderSuccess("success"));
        }else{
          dispatch(followOrderFail());
          dispatch(showErrorSuccess(response.data.message));
          }
      })
      .catch((err) => {
        dispatch(followOrderFail());
      });
  };
};

export const resetOrderInfoResult = () => {
  return (dispatch) => {
    dispatch(saveOrderInfoSuccess(""));
    dispatch(orderCancelSuccess(""));
    dispatch(followOrderSuccess(""));
  }
};