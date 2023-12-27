import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  error: null,
};


const showErrorSuccess = (state, action) => {
    return updateObject(state, {
        error: action.error,
    });
  };



const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.SHOW_ERROR_SUCCESS:
        return showErrorSuccess(state, action);
      default:
        return state;
    }
  };
  
  export default reducer;
  