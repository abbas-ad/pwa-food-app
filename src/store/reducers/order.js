import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  recommendedItems: [],
  loading: false,
  paymentResult: '',
  orders: [],
  order: {},
  saveOrderInfoResult: '',
  cancelLoading: '',
  cancelOrderResult: '',
  followLoading: '',
  followOrderResult: ''
};


const fetchRecommendedItemsStart = (state, action) => {
    return updateObject(state, { loading: true });
  };
  
  const fetchRecommendedItemsSuccess = (state, action) => {
    return updateObject(state, {
        recommendedItems: action.items,
        loading: false
    });
  };
  
  const fetchRecommendedItemsFail = (state, action) => {
    return updateObject(state, {
        loading: false
    });
  };


  const paymentStart = (state, action) => {
    return updateObject(state, { loading: true });
  };
  
  const paymentSuccess = (state, action) => {
    return updateObject(state, {
        paymentResult: action.result,
        loading: false
    });
  };
  
  const paymentFail = (state, action) => {
    return updateObject(state, {
        paymentResult: 'failed',
        loading: false
    });
  };



  const fetchOrdersStart = (state, action) => {
    return updateObject(state, { loading: true });
  };
  
  const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
  };
  
  const fetchOrdersFail = (state, action) => {
    return updateObject(state, {
        loading: false
    });
  };

  const saveOrderInfoStart = (state, action) => {
    return updateObject(state, { loading: true });
  };
  
  const saveOrderInfoSuccess = (state, action) => {
    return updateObject(state, {
      saveOrderInfoResult: action.result,
        loading: false
    });
  };
  
  const saveOrderInfoFail = (state, action) => {
    return updateObject(state, {
        loading: false
    });
  };


  const cancelOrderStart = (state, action) => {
    return updateObject(state, { cancelLoading: true });
  };
  
  const cancelOrderSuccess = (state, action) => {
    return updateObject(state, {
        cancelOrderResult: action.result,
        cancelLoading: false
    });
  };
  
  const cancelOrderFail = (state, action) => {
    return updateObject(state, {
        cancelOrderResult: 'failed',
        cancelLoading: false
    });
  };

  
  const followOrderStart = (state, action) => {
    return updateObject(state, { followLoading: true });
  };
  
  const followOrderSuccess = (state, action) => {
    return updateObject(state, {
        followOrderResult: action.result,
        followLoading: false
    });
  };
  
  const followOrderFail = (state, action) => {
    return updateObject(state, {
      followOrderResult: 'failed',
        followLoading: false
    });
  };
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_RECOMMENDED_ITEM_START:
          return fetchRecommendedItemsStart(state, action);
        case actionTypes.FETCH_RECOMMENDED_ITEM_SUCCESS:
          return fetchRecommendedItemsSuccess(state, action);
        case actionTypes.FETCH_RECOMMENDED_ITEM_FAIL:
          return fetchRecommendedItemsFail(state, action);

          case actionTypes.PAYMENT_START:
            return paymentStart(state, action);
          case actionTypes.PAYMENT_SUCCESS:
            return paymentSuccess(state, action);
          case actionTypes.PAYMENT_FAIL:
            return paymentFail(state, action);

            case actionTypes.FETCH_ORDERS_START:
              return fetchOrdersStart(state, action);
            case actionTypes.FETCH_ORDERS_SUCCESS:
              return fetchOrdersSuccess(state, action);
            case actionTypes.FETCH_ORDERS_FAIL:
              return fetchOrdersFail(state, action);

              case actionTypes.SAVE_ORDER_INFO_START:
                return saveOrderInfoStart(state, action);
              case actionTypes.SAVE_ORDER_INFO_SUCCESS:
                return saveOrderInfoSuccess(state, action);
              case actionTypes.SAVE_ORDER_INFO_FAIL:
                return saveOrderInfoFail(state, action);

                case actionTypes.CANCEL_ORDER_START:
                  return cancelOrderStart(state, action);
                case actionTypes.CANCEL_ORDER_SUCCESS:
                  return cancelOrderSuccess(state, action);
                case actionTypes.CANCEL_ORDER_FAIL:
                  return cancelOrderFail(state, action);


                  case actionTypes.FOLLOW_ORDER_START:
                    return followOrderStart(state, action);
                  case actionTypes.FOLLOW_ORDER_SUCCESS:
                    return followOrderSuccess(state, action);
                  case actionTypes.FOLLOW_ORDER_FAIL:
                    return followOrderFail(state, action);

      default:
        return state;
    }
  };
  
  export default reducer;