import axios from "../../foodAxios";
import * as actionTypes from "./actionTypes";

export const showErrorSuccess = (error) => {
  return {
    type: actionTypes.SHOW_ERROR_SUCCESS,
    error,
  };
};

export const authCodeStart = () => {
  return {
    type: actionTypes.AUTH_CODE_START,
  };
};

export const authCodeSuccess = (status) => {
  return {
    type: actionTypes.AUTH_CODE_SUCCESS,
    status,
  };
};

export const authCodeFail = () => {
  return {
    type: actionTypes.AUTH_CODE_FAIL,
  };
};

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

export const loginSuccess = (token,user) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token,
    user
  };
};

export const loginFail = () => {
  return {
    type: actionTypes.LOGIN_FAIL,
  };
};

export const getAuthCode = (phone) => {
  return (dispatch) => {
    dispatch(authCodeStart());
    const body = { phone: phone };
    axios
      .post("/activation/sendSms", body)
      .then((response) => {
        if(response.data.status === 'success'){
          dispatch(authCodeSuccess(response.data.status));
        }else{
          dispatch(authCodeFail());
          dispatch(showErrorSuccess(response.data.message));
        }
      })
      .catch((err) => {
        dispatch(authCodeFail());
      });
  };
};

export const login = (data) => {
  return (dispatch) => {
    dispatch(loginStart());
    const body = { ...data };
    axios
      .post("/auth/login", body)
      .then((response) => {
        if (response.data.status === "success") {
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("address", '0');
          dispatch(loginSuccess(response.data.access_token,response.data.user_info));
        }else{
          dispatch(loginFail());
          dispatch(showErrorSuccess(response.data.message));
        }
      })
      .catch((err) => {
        dispatch(loginFail());
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authCheck = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      dispatch(loginSuccess(token,{first_name: 'ma',last_name: 'ma'}));
    }
  };
};
