import React,{useEffect} from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

import Layout from './hoc/layout/Layout';
import ProtectedRoute from './hoc/ProtectedRoute/ProtectedRoute';

import Home from './pages/Home/Home';
import Restaurant from './pages/Restaurant/Restaurant';
import Comments from './pages/Comments/Comments';
import Profile from './pages/Profile/Profile';
import Account from './pages/Account/Account';
import Wallet from './pages/Wallet/Wallet';
import IncreaseWallet from './pages/Wallet/IncreaseWallet/IncreaseWallet';
import Product from './pages/Products/Product/Product';
import Products from './pages/Products/Products';
import Orders from './pages/Orders/Orders';
import Favorites from './pages/Favorites/Favorites';
import Auth from './pages/Auth/Auth';
import Addresses from './pages/Addresses/Addresses';
import EditAddress from './pages/EditAddress/EditAddress';
import NewAddress from './pages/NewAddress/NewAddress';
import Cart from './pages/Cart/Cart';
import Payment from './pages/Payment/Payment';
import PaymentResult from './pages/Payment/PaymentResult';
import NewNote from './pages/NewNote/NewNote';
import Order from './pages/Order/Order';
import Search from './pages/Search/Search';
import MenuItemsSearch from './pages/MenuItemsSearch/MenuItemsSearch';
import RestaurantsByCategory from './pages/RestaurantsByCategory/RestaurantsByCategory';
import ProductsByCategory from './pages/ProductsByCategory/ProductsByCategory';
import Filter from './pages/Filter/Filter';
import Splash from './pages/Splash/Splash';

function App(props) {

  useEffect(() => {
    // if(window.screen.width > 1000) window.location.href = 'https://mafoods.ir';

    // props.onCheckSelectedAddress();
  }, []);

  return (
      <Switch>
        <Layout>
        <Route path="/" exact component={Splash} />
        <Route path="/filter" component={Filter} />
        <Route path="/category/restaurant" component={RestaurantsByCategory} />
        <Route path="/category/market" component={ProductsByCategory} />
        <Route path="/search" component={Search} />
        <Route path="/auth" component={Auth} />
        <Route path="/products" component={Products} />
        <Route path="/product/:id" component={Product} />
        <Route path="/restaurants/:slug/comments" component={Comments} />
        <Route path="/restaurants/:slug/search" exact component={MenuItemsSearch} />
        <Route path="/restaurants/:slug" exact component={Restaurant} />
        <ProtectedRoute isAuthenticated={props.isAuthenticated} path="/profile" component={Profile} />
        <ProtectedRoute isAuthenticated={props.isAuthenticated} path="/order/:id" component={Order} />
        <ProtectedRoute isAuthenticated={props.isAuthenticated} path="/newnote" component={NewNote} />
        <ProtectedRoute isAuthenticated={props.isAuthenticated} path="/payment" component={Payment} />
        <ProtectedRoute isAuthenticated={props.isAuthenticated} path="/payment-result" component={PaymentResult} />
        <ProtectedRoute isAuthenticated={props.isAuthenticated} path="/cart" component={Cart} />
        <ProtectedRoute isAuthenticated={props.isAuthenticated} path="/editaddress/:id" component={EditAddress} />
        <ProtectedRoute isAuthenticated={props.isAuthenticated} path="/new-address" component={NewAddress} />
        <ProtectedRoute isAuthenticated={props.isAuthenticated} path="/addresses" component={Addresses} />
        <ProtectedRoute isAuthenticated={props.isAuthenticated} path="/favorites" component={Favorites} />
        <ProtectedRoute isAuthenticated={props.isAuthenticated} path="/orders" component={Orders} />
        <ProtectedRoute isAuthenticated={props.isAuthenticated} path="/increase-wallet" component={IncreaseWallet} />
        <ProtectedRoute isAuthenticated={props.isAuthenticated} path="/wallet" component={Wallet} />
        <ProtectedRoute isAuthenticated={props.isAuthenticated} path="/account" component={Account} />
        <Route path="/home" component={Home} />
        </Layout>
      </Switch>
      
  );
}


const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheck: () => dispatch(actions.authCheck()),
    onCheckSelectedAddress: () => dispatch(actions.checkSelectedAddress()),
  };
};


export default  connect(mapStateToProps, mapDispatchToProps)(App);
