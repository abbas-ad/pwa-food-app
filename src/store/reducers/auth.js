import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  token: null,
  registerToken: null,
  error: null,
  loading: false,
  authCodeStatus: "fail",
  loginStatus: "",
  authCodeMessageId: "",
  authCodeValid: "",
  authRedirectPath: "/home",
  user: {}
};

const authCodeStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const authCodeSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    authCodeStatus: action.status,
  });
};
const authCodeFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

const loginStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const loginSuccess = (state, action) => {
  return updateObject(state, {
    loginStatus: 'success',
    user: {...action.user},
    token: action.user.first_name && action.user.last_name ? action.token : null,
    registerToken: action.token,
    loading: false,
  });
};

const loginFail = (state, action) => {
  return updateObject(state, {loginStatus: 'failed', loading: false });
};

const authLogout = (state, action) => {
  return updateObject(state, { 
    token: null,
    authCodeStatus: "fail",
    loginStatus: "" });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_CODE_START:
      return authCodeStart(state, action);
    case actionTypes.AUTH_CODE_SUCCESS:
      return authCodeSuccess(state, action);
    case actionTypes.AUTH_CODE_FAIL:
      return authCodeFail(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);

    case actionTypes.LOGIN_START:
      return loginStart(state, action);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.LOGIN_FAIL:
      return loginFail(state, action);
    default:
      return state;
  }
};

export default reducer;
