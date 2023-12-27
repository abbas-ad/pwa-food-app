import axios from "../../foodAxios";
import * as actionTypes from "./actionTypes";

export const showErrorSuccess = (error) => {
  return {
    type: actionTypes.SHOW_ERROR_SUCCESS,
    error,
  };
};

const addressStart = () => {
  return {
    type: actionTypes.ADDRESS_START,
  };
};

const addressesFetchSuccess = (addresses) => {
  return {
    type: actionTypes.FETCH_ADDRESSES_SUCCESS,
    addresses,
  };
};


const userFetchStart = () => {
  return {
    type: actionTypes.FETCH_USER_START,
  };
};
const userFetchSuccess = (user) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    user
  };
};

const userUpdateStart = () => {
  return {
    type: actionTypes.UPDATE_USER_START,
  };
};
const userUpdateSuccess = (status) => {
  return {
    type: actionTypes.UPDATE_USER_SUCCESS,
    status
  };
};

export const loginSuccess = (token,user) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    user,
    token,
  };
};


const addAddressStart = () => {
  return {
    type: actionTypes.ADD_ADDRESS_START,
  };
};
const addAddressSuccess = (result) => {
  return {
    type: actionTypes.ADD_ADDRESS_SUCCESS,
    result
  };
};
const addAddressFail = () => {
  return {
    type: actionTypes.ADD_ADDRESS_FAIL,
  };
};


const editAddressStart = () => {
  return {
    type: actionTypes.EDIT_ADDRESS_START,
  };
};
const editAddressSuccess = (result) => {
  return {
    type: actionTypes.EDIT_ADDRESS_SUCCESS,
    result
  };
};
const editAddressFail = () => {
  return {
    type: actionTypes.EDIT_ADDRESS_FAIL,
  };
};


const deleteAddressStart = () => {
  return {
    type: actionTypes.DELETE_ADDRESS_START,
  };
};
const deleteAddressSuccess = (result) => {
  return {
    type: actionTypes.DELETE_ADDRESS_SUCCESS,
    result
  };
};
const deleteAddressFail = () => {
  return {
    type: actionTypes.DELETE_ADDRESS_FAIL,
  };
};

const citiesFetchStart = () => {
  return {
    type: actionTypes.FETCH_CITIES_START,
  };
};

const citiesFetchSuccess = (cities) => {
  return {
    type: actionTypes.FETCH_CITIES_SUCCESS,
    cities,
  };
};

const citiesFetchFail = () => {
  return {
    type: actionTypes.FETCH_CITIES_FAIL,
  };
};


const streetsFetchStart = () => {
  return {
    type: actionTypes.FETCH_STREETS_START,
  };
};

const streetsFetchSuccess = (streets) => {
  return {
    type: actionTypes.FETCH_STREETS_SUCCESS,
    streets,
  };
};

const streetsFetchFail = () => {
  return {
    type: actionTypes.FETCH_STREETS_FAIL,
  };
};



const regionsFetchStart = () => {
  return {
    type: actionTypes.FETCH_REGIONS_START,
  };
};

const regionsFetchSuccess = (regions) => {
  return {
    type: actionTypes.FETCH_REGIONS_SUCCESS,
    regions,
  };
};

const regionsFetchFail = () => {
  return {
    type: actionTypes.FETCH_REGIONS_FAIL,
  };
};

const walletFetchStart = () => {
  return {
    type: actionTypes.FETCH_WALLET_START,
  };
};

const walletFetchSuccess = (wallet, trasactions) => {
  return {
    type: actionTypes.FETCH_WALLET_SUCCESS,
    wallet: wallet,
    walletTransactions: trasactions,
  };
};

const walletChangeStart = () => {
  return {
    type: actionTypes.CHANGE_WALLET_START,
  };
};

const walletChangeSuccess = (wallet, trasactions, status) => {
  return {
    type: actionTypes.CHANGE_WALLET_SUCCESS,
    wallet,
    walletTransactions: trasactions,
    status,
  };
};

export const setSelectedAddressSuccess = (selectedAddress,title) => {
  return {
    type: actionTypes.SET_SELECTED_ADDRESS,
    selectedAddress,
    title
  };
};

const noteAddSuccess = (note) => {
  return {
    type: actionTypes.ADD_NOTE_SUCCESS,
    note,
  };
};

const noteRemoveSuccess = () => {
  return {
    type: actionTypes.REMOVE_NOTE_SUCCESS,
  };
};

export const setIsMarket = (result) => {
  return {
    type: actionTypes.SET_IS_MARKET_SUCCESS,
    result,
  };
};

export const fetchAddresses = (token,selectedAddress) => {
  return (dispatch) => {
    dispatch(addressStart());
    axios
      .get("/userAddress/getUserAddress", {
        headers: { authorization: "Bearer " + token },
      })
      .then((response) => {
        if (response.data.status === "success") {
          if(+selectedAddress > 0 && response.data.data.length > 0){
            const address = response.data.data.find(address => address.id === +selectedAddress) || 0;
            dispatch(setSelectedAddressSuccess(selectedAddress,`${address.city} - ${address.neighbourhood} - ${address.street}`));  
          }else{
            dispatch(setSelectedAddressSuccess(0,`انتخاب آدرس`));  

          }
          dispatch(addressesFetchSuccess(response.data.data));
        }else{
          dispatch(showErrorSuccess(response.data.message));
          }
      })
      .catch((err) => {
        dispatch(addAddressFail());
      });
  };
};

export const addAddress = (token, address) => {
  return (dispatch) => {
    dispatch(addAddressSuccess(''));
    dispatch(addAddressStart());
    axios
      .put(
        "/userAddress/saveUserAddress",
        { ...address },
        {
          headers: { authorization: "Bearer " + token },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(addAddressSuccess('success'));
          dispatch(addAddressSuccess(''));
        }else{
          dispatch(showErrorSuccess(response.data.message));
          }
      })
      .catch((err) => {
        //dispatch(orderFail());
      });
  };
};

export const editAddress = (token, address) => {
  return (dispatch) => {
    dispatch(editAddressStart());
    axios
      .patch(
        "/userAddress/updateUserAddress",
        { ...address },
        {
          headers: { authorization: "Bearer " + token },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(editAddressSuccess(response.data.status));
        }else{
          dispatch(showErrorSuccess(response.data.message));
          }
      })
      .catch((err) => {
        //dispatch(orderFail());
      });
  };
};

export const deleteAddress = (token, addressId) => {
  return (dispatch) => {
    dispatch(deleteAddressSuccess(''));
    dispatch(deleteAddressStart());
    axios
      .post(
        "/userAddress/deleteUserAddress",
        { address_id: addressId },
        {
          headers: { authorization: "Bearer " + token },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(deleteAddressSuccess(response.data.status));
        }else{
          dispatch(showErrorSuccess(response.data.message));
          }
      })
      .catch((err) => {
        //dispatch(orderFail());
      });
  };
};

export const resetEditAddressResult = () => {
  return (dispatch) => {
    dispatch(editAddressSuccess(''));
  };
};

export const fetchWallet = (token) => {
  return (dispatch) => {
    dispatch(walletFetchStart());
    axios
      .get("/wallet/getWallet", {
        headers: { authorization: "Bearer " + token },
      })
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(
            walletFetchSuccess(
              response.data.current_wallet,
              response.data.wallet
            )
          );
        }else{
          dispatch(showErrorSuccess(response.data.message));
          }
      })
      .catch((err) => {
        //dispatch(orderFail());
      });
  };
};

export const changeWallet = (token, balance, type) => {
  return (dispatch) => {
    dispatch(walletChangeStart());
    axios
      .post(
        "/wallet/changeWallet",
        { balance, type },
        {
          headers: { authorization: "Bearer " + token },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          setTimeout(() => {
            dispatch(
              walletChangeSuccess(
                response.data.current_wallet,
                response.data.wallet,
                ""
              )
            );
          }, 1500);
          dispatch(
            walletChangeSuccess(
              response.data.current_wallet,
              response.data.wallet,
              "success"
            )
          );
        }else{
          dispatch(showErrorSuccess(response.data.message));
          }
      })
      .catch((err) => {
        //dispatch(orderFail());
      });
  };
};



export const fetchCities = (token) => {
  return (dispatch) => {
    dispatch(citiesFetchStart());
    axios
      .get("/userAddress/getCities", {
        headers: { authorization: "Bearer " + token },
      })
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(citiesFetchSuccess(response.data.data));
        }else{
          dispatch(showErrorSuccess(response.data.message));
          }
      })
      .catch((err) => {
        //dispatch(orderFail());
      });
  };
};


export const fetchStreets = (token,regionId) => {
  return (dispatch) => {
    dispatch(streetsFetchStart());
    axios
      .post("/userAddress/getStreets",{neighbourhood_id: regionId}, {
        headers: { authorization: "Bearer " + token },
      })
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(streetsFetchSuccess(response.data.data));
        }else{
          dispatch(showErrorSuccess(response.data.message));
          }
      })
      .catch((err) => {
        //dispatch(orderFail());
      });
  };
};

export const fetchRegions = (token,cityId) => {
  return (dispatch) => {
    dispatch(regionsFetchStart());
    axios
      .post("/userAddress/getNeighbourhoods",{city_id: cityId}, {
        headers: { authorization: "Bearer " + token },
      })
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(regionsFetchSuccess(response.data.data));
        }else{
          dispatch(showErrorSuccess(response.data.message));
          }
      })
      .catch((err) => {
        //dispatch(orderFail());
      });
  };
};

export const setSelectedAddress = (selectedAddress) => {
  return (dispatch) => {
    localStorage.setItem("address", selectedAddress);
    dispatch(setSelectedAddressSuccess(selectedAddress,''));
  };
};

export const checkSelectedAddress = () => {
  return (dispatch) => {
    const selectedAddress = localStorage.getItem("address");
    if (+selectedAddress > 0) {
      dispatch(setSelectedAddressSuccess(selectedAddress,'انتخاب آدرس'));
    } else {
      dispatch(setSelectedAddressSuccess('0','انتخاب آدرس'));
    }
  };
};


export const addItemFavorite = (token,itemId,callback) => {
  
    axios
      .post("/user/saveFavoriteItem",{item_id: itemId}, {
        headers: { authorization: "Bearer " + token },
      })
      .then((response) => {
        callback(response.data);
      })
      .catch((err) => {
        
      });
};

export const addRestaurantToFavorite = (token,restaurantSlug,callback) => {
  
  axios
    .post("/user/saveFavoriteRestaurant",{restaurant_slug: restaurantSlug}, {
      headers: { authorization: "Bearer " + token },
    })
    .then((response) => {
      callback({...response.data});
    })
    .catch((err) => {
      
    });
};



export const fetchUser = () => {
  return (dispatch) => {
    dispatch(userFetchStart());
    axios
      .get("/user/getUser", {
        headers: { authorization: "Bearer " + localStorage.getItem('token') },
      })
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(userFetchSuccess(response.data.data));
        }
      })
      .catch((err) => {
        //dispatch(orderFail());
      });
  };
};




export const updateUser = (token, user) => {
  return (dispatch) => {
    dispatch(userUpdateStart());
    axios
      .post(
        "/user/saveUserInfo",
        { ...user },
        {
          headers: { authorization: "Bearer " + token },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(loginSuccess(localStorage.getItem('token'),{...user}));
          dispatch(userUpdateSuccess('success'));
        }else{
          dispatch(showErrorSuccess(response.data.message));
          }
      })
      .catch((err) => {
        //dispatch(orderFail());
      });
  };
};


export const addNote = (note) => {
  return (dispatch) => {
    localStorage.setItem('note',note);
    dispatch(noteAddSuccess(note));
  };
};

export const removeNote = () => {
  return (dispatch) => {
    localStorage.setItem('note','');
    dispatch(noteRemoveSuccess());
  };
};

export const fetchNote = () => {
  return (dispatch) => {
    dispatch(noteAddSuccess(localStorage.getItem('note')));
  };
};


export const resetError = () => {
  return (dispatch) => {
    dispatch(showErrorSuccess(null));
  };
};