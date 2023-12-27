import * as actionTypes from "../actions/actionTypes";
import { updateObject, showAlert } from "../../shared/utility";

const initialState = {
  user: {},
  error: null,
  fetchLoading: false,
  addLoading: false,
  addAddressResult: '',
  editLoading: false,
  editAddressResult: '',
  deleteLoading: false,
  deleteAddressResult: '',
  selectedAddress: '0',
  selectedAddressTitle: 'انتخاب آدرس',
  addresses: [],
  cities: [],
  streets: [],
  regions: [],
  wallet: 0,
  walletTransactions: [],
  walletLoading: false,
  walletChangeLoading: false,
  walletChangeStatus: "",
  userUpdateStatus: "",
  note: "",
  isMarket: false
};

const addressesFetchStart = (state, action) => {
  return updateObject(state, { fetchLoading: true });
};

const addressesFetchSuccess = (state, action) => {
  return updateObject(state, {
    addresses: action.addresses,
    fetchLoading: false,
  });
};

const addAddressStart = (state, action) => {
  return updateObject(state, {
    addLoading: true,
  });
};

const addAddressSuccess = (state, action) => {
  return updateObject(state, {
    addLoading: false,
    addAddressResult: action.result
  });
};
const addAddressFail = (state, action) => {
  return updateObject(state, {
    addLoading: false,
  });
};


const editAddressStart = (state, action) => {
  return updateObject(state, {
    editLoading: true,
  });
};

const editAddressSuccess = (state, action) => {
  return updateObject(state, {
    editAddressResult: action.result,
    editLoading: false,
  });
};
const editAddressFail = (state, action) => {
  return updateObject(state, {
    editAddressResult: 'fail',
    editLoading: false,
  });
};


const deleteAddressStart = (state, action) => {
  return updateObject(state, {
    deleteLoading: true,
  });
};

const deleteAddressSuccess = (state, action) => {
  return updateObject(state, {
    deleteAddressResult: action.result,
    deleteLoading: false,
  });
};
const deleteAddressFail = (state, action) => {
  return updateObject(state, {
    deleteAddressResult: 'fail',
    deleteLoading: false,
  });
};

const citiesFetchStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const citiesFetchSuccess = (state, action) => {
  return updateObject(state, {
    cities: action.cities,
    loading: false,
  });
};

const citiesFetchFail = (state, action) => {
  return updateObject(state, { loading: true });
};

const streetsFetchStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const streetsFetchSuccess = (state, action) => {
  return updateObject(state, {
    streets: action.streets,
    loading: false,
  });
};

const streetsFetchFail = (state, action) => {
  return updateObject(state, { loading: true });
};


const regionsFetchStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const regionsFetchSuccess = (state, action) => {
  return updateObject(state, {
    regions: action.regions,
    loading: false,
  });
};

const regionsFetchFail = (state, action) => {
  return updateObject(state, { loading: true });
};

const walletFetchStart = (state, action) => {
  return updateObject(state, { walletLoading: true });
};

const walletFetchSuccess = (state, action) => {
  return updateObject(state, {
    wallet: action.wallet,
    walletTransactions: action.walletTransactions,
    walletLoading: false,
  });
};

const walletChangeStart = (state, action) => {
  return updateObject(state, { walletChangeLoading: true });
};

const walletChangeSuccess = (state, action) => {
  return updateObject(state, {
    wallet: action.wallet,
    walletTransactions: action.walletTransactions,
    walletChangeStatus: action.status,
    walletChangeLoading: false,
  });
};

const addSelectedAddressSuccess = (state, action) => {
  return updateObject(state, { selectedAddress: action.selectedAddress,selectedAddressTitle: action.title });
};

const fetchUserStart = (state, action) => {
  return updateObject(state, {  });
};

const fetchUserSuccess = (state, action) => {
  return updateObject(state, {
    user: action.user
  });
};

const userUpdateStart = (state, action) => {
  return updateObject(state, { editLoading: true });
};

const userUpdateSuccess = (state, action) => {
  return updateObject(state, {
    userUpdateStatus: action.staus,
    editLoading: false,
  });
};

const userUpdateFail = (state, action) => {
  return updateObject(state, { editLoading: false });
};


const addNoteSuccess = (state, action) => {
  return updateObject(state, {
    note: action.note,
  });
};

const removeNoteSuccess = (state, action) => {
  return updateObject(state, {
    note: '',
  });
};

const setIsMarket = (state, action) => {
  return updateObject(state, {
    isMarket: action.result,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_IS_MARKET_SUCCESS:
      return setIsMarket(state, action);

    case actionTypes.ADDRESS_START:
      return addressesFetchStart(state, action);

    case actionTypes.FETCH_ADDRESSES_SUCCESS:
      return addressesFetchSuccess(state, action);

    case actionTypes.ADD_ADDRESS_START:
        return addAddressStart(state, action);
    case actionTypes.ADD_ADDRESS_SUCCESS:
      return addAddressSuccess(state, action);
      case actionTypes.ADD_ADDRESS_FAIL:
        return addAddressFail(state, action);

        case actionTypes.FETCH_USER_START:
          return fetchUserStart(state, action);
      case actionTypes.FETCH_USER_SUCCESS:
        return fetchUserSuccess(state, action);

        case actionTypes.UPDATE_USER_START:
          return userUpdateStart(state, action);
      case actionTypes.UPDATE_USER_SUCCESS:
        return userUpdateSuccess(state, action);

        case actionTypes.EDIT_ADDRESS_START:
          return editAddressStart(state, action);
      case actionTypes.EDIT_ADDRESS_SUCCESS:
        return editAddressSuccess(state, action);
        case actionTypes.EDIT_ADDRESS_FAIL:
          return editAddressFail(state, action);

          case actionTypes.DELETE_ADDRESS_START:
            return deleteAddressStart(state, action);
        case actionTypes.DELETE_ADDRESS_SUCCESS:
          return deleteAddressSuccess(state, action);
          case actionTypes.DELETE_ADDRESS_FAIL:
            return deleteAddressFail(state, action);

    case actionTypes.FETCH_WALLET_START:
      return walletFetchStart(state, action);
    case actionTypes.FETCH_WALLET_SUCCESS:
      return walletFetchSuccess(state, action);
    case actionTypes.CHANGE_WALLET_START:
      return walletChangeStart(state, action);

    case actionTypes.CHANGE_WALLET_SUCCESS:
      return walletChangeSuccess(state, action);
      
      case actionTypes.FETCH_CITIES_START:
        return citiesFetchStart(state, action);
      case actionTypes.FETCH_CITIES_SUCCESS:
        return citiesFetchSuccess(state, action);
      case actionTypes.FETCH_CITIES_FAIL:
        return citiesFetchFail(state, action); 

        case actionTypes.FETCH_STREETS_START:
          return streetsFetchStart(state, action);
        case actionTypes.FETCH_STREETS_SUCCESS:
          return streetsFetchSuccess(state, action);
        case actionTypes.FETCH_STREETS_FAIL:
          return streetsFetchFail(state, action); 

          case actionTypes.FETCH_REGIONS_START:
            return regionsFetchStart(state, action);
          case actionTypes.FETCH_REGIONS_SUCCESS:
            return regionsFetchSuccess(state, action);
          case actionTypes.FETCH_REGIONS_FAIL:
            return regionsFetchFail(state, action); 

            case actionTypes.ADD_NOTE_SUCCESS:
              return addNoteSuccess(state, action);
            case actionTypes.REMOVE_NOTE_SUCCESS:
              return removeNoteSuccess(state, action); 

            case actionTypes.SET_SELECTED_ADDRESS:
              return addSelectedAddressSuccess(state, action); 
    default:
      return state;
  }
};

export default reducer;
