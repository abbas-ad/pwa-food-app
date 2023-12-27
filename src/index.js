import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {loginSuccess} from './store/actions/auth'
import {setSelectedAddressSuccess} from './store/actions/user'
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import 'swiper/swiper.scss';
import './index.css';
import 'rc-slider/assets/index.css';


import App from './App';

import userReducer from "./store/reducers/user";
import authReducer from "./store/reducers/auth";
import restaurantReducer from "./store/reducers/restaurant";
import marketReducer from "./store/reducers/market";
import cartReducer from "./store/reducers/cart";
import favoriteReducer from "./store/reducers/favorite";
import orderReducer from "./store/reducers/order";
import searchReducer from "./store/reducers/search";
import errorReducer from "./store/reducers/error";
const composeEnhancers  = 
  process.env.NODE_ENV === "development"
    & null || compose;

    
const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  restaurant: restaurantReducer,
  market: marketReducer,
  cart: cartReducer,
  favorite: favoriteReducer,
  order: orderReducer,
  search: searchReducer,
  error: errorReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

let token = localStorage.getItem('token');
const selectedAddress = localStorage.getItem("address");

if (token !== null) {
    store.dispatch(loginSuccess(token,{first_name: 'ma',last_name: 'ma'}));
}
store.dispatch(setSelectedAddressSuccess(selectedAddress,'انتخاب آدرس'));

const app = (
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
);
ReactDOM.render(app ,document.getElementById('root'));

serviceWorkerRegistration.register();

reportWebVitals();
