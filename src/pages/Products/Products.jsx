import React,{useState,useEffect} from 'react';
import Toolbar from '../../components/Ui/Toolbar/Toolbar';
import {ReactComponent as BackIcon} from '../../assets/svgs/backIcon.svg'
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import HorizentalProduct from '../../components/Product/Horizental/Horizental';
import { NavLink } from 'react-router-dom';

import ButtonPrimary from '../../components/Ui/Button/ButtonPrimary';
import SnackBar from '../../components/Ui/SnackBar/SnackBar';
import {ReactComponent as LoginIcon} from '../../assets/svgs/message/login.svg'

const Products = (props) => {
    const [urlQueries,setUrlQueries] = useState(new URLSearchParams(props.location.search));
    const [loginSnackBarOpen,setLoginSnackBarOpen] = useState(false);
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        if(urlQueries.get('filter')){
            switch (urlQueries.get('filter')) {
                case 'tops':
                    setProducts(props.products.filter(product=>product.rating > 3))
                    break;
                case 'off':
                    setProducts(props.products.filter(product=>product.is_off === '1'))
                    break;
                case 'popular':
                    setProducts(props.products.filter(product=>product.is_popular === '1'))
                    break;
                default:
                    break;
            }
        }
    },[])

    
    const handleFavoriteClick = (itemId)=>{
        if(props.isAuthenticated){
            props.onAddItemToFavorite(props.token,[itemId]);
        }else{
            props.history.push('/auth')
        }
    }

    useEffect(()=>{
        if(props.favoriteItemStatus === 'success'){
            props.onFetchFavorites(props.token);
            props.onResetFavoriteStatus();
        }
    },[props.favoriteItemStatus]);


    const handleAddtoCart = (resaurantSlug,itemId)=>{
        if(props.isAuthenticated){
            props.onAddToCart(props.token,resaurantSlug,itemId);
        }else{
            setLoginSnackBarOpen(prev=>!prev);
        }
    }

    const handleRemoveFromCart = (itemId)=>{
        if(props.isAuthenticated){
            props.onRemoveCartItem(props.token,props.cartOrder.id,itemId);
        }else{
            setLoginSnackBarOpen(prev=>!prev);
        }
    }


    const handleSnackBarBackDropClick = ()=>{
        setLoginSnackBarOpen(false);
    }
    const handleBackClick = ()=>{
        props.history.goBack();
    }
    return (
        <section className='pb-5'>
            <Toolbar startIcon={<BackIcon onClick={handleBackClick}/>}>محصولات</Toolbar>

            <ul>
                {products.map(product=>(
                        <li key={`product${product.id}`}><HorizentalProduct 
                        product={product} history={props.history}
                        cart={props.cart} onFavoriteClick={handleFavoriteClick} favorites={props.favorites}
                            isAuthenticated={props.isAuthenticated} handleAddToCartBtnClick={handleAddtoCart} handleRemoveFromCartBtnClick={handleRemoveFromCart}
                         /></li>
                    ))}
            </ul>

            <SnackBar open={loginSnackBarOpen} onBackDropClick={handleSnackBarBackDropClick} className='overflow-y-auto'>
                <LoginIcon className='mx-auto mb-5'/>
                <p className='text-xl font-medium text-center mb-10'>.برای ثبت سفارش ابتدا باید وارد حساب کاربری خود شوید</p>
                <NavLink to='/auth'><ButtonPrimary className='ml-5'>ورود</ButtonPrimary></NavLink>
            </SnackBar>
            
        </section>
    );
};



const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null,
        products: state.market.products,
        favorites: state.favorite.favoriteItems,
        cart: state.cart.cart,
        cartOrder: state.cart.order,
        lastChangedItem: state.favorite.lastChangedItem,
        favoriteItemStatus: state.favorite.favoriteItemStatus,
        favoriteItemStatusMessage: state.favorite.favoriteItemStatusMessage,
        favoriteRestaurants: state.favorite.favoriteRestaurants,
        favoriteRestaurantStatus: state.favorite.favoriteRestaurantStatus,

    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onFetchBanners: () => dispatch(actions.fetchBanners()),
        onFetchCategories: () => dispatch(actions.fetchMarketCategories()),
        onAddToCart: (token,restaurantSlug,itemId) => dispatch(actions.addCartItem(token,restaurantSlug,itemId)),
        onRemoveCartItem: (token,orderId,itemId) => dispatch(actions.removeCartItem(token,orderId,itemId)),
        onFetchCart: (token) => dispatch(actions.fetchCart(token)),
        onAddItemToFavorite: (token,itemIds) => dispatch(actions.addItemFavorite(token,itemIds)),
        onResetFavoriteStatus: () => dispatch(actions.resetFavorite()),
        onFetchFavorites: (token) => dispatch(actions.fetchFavorites(token)),
        onAddRestaurantToFavorite: (token,restaurantSlugs) => dispatch(actions.addRestaurantToFavorite(token,restaurantSlugs)),
    }
  }
export default connect( mapStateToProps, mapDispatchToProps )(Products);