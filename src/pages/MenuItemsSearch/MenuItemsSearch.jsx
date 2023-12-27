import React,{useState,useEffect} from 'react';

import {ReactComponent as SearchIcon} from '../../assets/svgs/searchIcon.svg'
import {ReactComponent as BackIcon} from '../../assets/svgs/backIcon.svg';
import {ReactComponent as LoginIcon} from '../../assets/svgs/message/login.svg'
import {ReactComponent as RemoveIcon} from '../../assets/svgs/removeEditIcon.svg'
import Menu from '../../components/Menu/Menu';
import { addCommas } from '../../shared/utility';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import ButtonPrimary from '../../components/Ui/Button/ButtonPrimary';
import SnackBar from '../../components/Ui/SnackBar/SnackBar';
import { useForm } from "react-hook-form";

const MenuItemsSearch = (props) => {
    const [isSearch,setIsSearch] = useState(false)
    const [loginSnackBarOpen,setLoginSnackBarOpen] = useState(false);
    const [searchedItems,setSearchedItems] = useState([]);
    const {
        handleSubmit,
        register,
        formState: { errors }
      } = useForm();


    const handleSubmitSearch = (data)=>{
        if(isSearch){
            setSearchedItems([]);
        }else{
            setSearchedItems(props.restaurantMenuItems.filter(item=> item.name.match(data.search)));
        }
        setIsSearch(prev=>!prev);
    }
    const handleBackIconClick = ()=>{
        props.history.goBack();
    }

    
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

    const handleSnackBarBackDropClick = ()=>{
        setLoginSnackBarOpen(false);
    }


    return (
        <section className='min-h-screen bg-white'>
            <form className='bg-gray-secondary flex flex-row w-full px-4 items-center h-20' onSubmit={handleSubmit(handleSubmitSearch)}>
            <BackIcon onClick={handleBackIconClick} />

                    <input type="text" className='flex-1 bg-gray-secondary text-xl outline-none h-full mr-5' autoFocus placeholder='جستجوی رستوران ها و غذاها'
                        {...register('search',{onChange: (e) => setIsSearch(false)})}
                    id="" />
                    <button type='submit'>{isSearch ? <RemoveIcon /> : <SearchIcon />}</button>
                </form>


                <ul className='py-5'>
                {searchedItems.map(item=>(
                    <li key={item.id}>
                            <Menu menuInfo={item} key={item.id} menu={item} 
                            cart={props.cart} onFavoriteClick={handleFavoriteClick} favorites={props.favorites}
                            isAuthenticated={props.isAuthenticated} handleAddToCartBtnClick={handleAddtoCart} handleRemoveFromCartBtnClick={handleRemoveFromCart}/>
                    </li>
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
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token,
        cart: state.cart.cart,
        cartOrder: state.cart.order,
        restaurant: state.restaurant.restaurant,
        restaurantMenu: state.restaurant.restaurantMenu,
        restaurantMenuItems: state.restaurant.restaurantMenuItems,
        favorites: state.favorite.favoriteItems,
        lastChangedItem: state.favorite.lastChangedItem,
        favoriteItemStatus: state.favorite.favoriteItemStatus,
        favoriteItemStatusMessage: state.favorite.favoriteItemStatusMessage,


    }
  }
  const mapDispatchToProps = dispatch => {
    return {
        onFetchRestaurantMenuItems: (slug) => dispatch(actions.fetchRestaurantMenuItems(slug)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
        onAddToCart: (token,restaurantSlug,itemId) => dispatch(actions.addCartItem(token,restaurantSlug,itemId)),
        onRemoveCartItem: (token,orderId,itemId) => dispatch(actions.removeCartItem(token,orderId,itemId)),
        onFetchCart: (token) => dispatch(actions.fetchCart(token)),
        onAddItemToFavorite: (token,itemIds) => dispatch(actions.addItemFavorite(token,itemIds)),
        onResetFavoriteStatus: () => dispatch(actions.resetFavorite()),
        onFetchFavorites: (token) => dispatch(actions.fetchFavorites(token)),
        onAddRestaurantToFavorite: (token,restaurantSlugs) => dispatch(actions.addRestaurantToFavorite(token,restaurantSlugs)),
    }
  }


export default connect( mapStateToProps, mapDispatchToProps )(MenuItemsSearch);