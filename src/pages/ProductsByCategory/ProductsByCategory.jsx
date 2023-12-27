import React, {useState, useEffect, useRef } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import {ReactComponent as BackIcon} from '../../assets/svgs/backIcon.svg';
import PizzaIcon from '../../assets/svgs/pizaaIcon.svg';
import {ReactComponent as FilterIcon} from '../../assets/svgs/filterIcon.svg';
import {ReactComponent as ArrowDownIcon} from '../../assets/svgs/arrowDownIcon.svg';
import Toolbar from '../../components/Ui/Toolbar/Toolbar';
import HorizentalProduct from '../../components/Product/Horizental/Horizental';
import classNames from 'classnames';

import Loading from '../../components/Loading/Loading';
import PriceFilterSnackbar from '../../components/PriceFilterSnackbar/PriceFilterSnackbar';
import SortFilterSnackBar from '../../components/SortFilterSnackBar/SortFilterSnackBar';

import { NavLink } from 'react-router-dom';
import ButtonPrimary from '../../components/Ui/Button/ButtonPrimary';
import SnackBar from '../../components/Ui/SnackBar/SnackBar';
import {ReactComponent as LoginIcon} from '../../assets/svgs/message/login.svg'
const ProductsByCategory = (props) => {
    const [loginSnackBarOpen,setLoginSnackBarOpen] = useState(false);

    const [urlQueries,setUrlQueries] = useState(new URLSearchParams(props.location.search));
    const [menuTopPosition,setMenuTopPosition] = useState(0);
    const [priceFilterOpen,setPriceFilterOpen] = useState(false);
    const [sortFilterOpen,setSortFilterOpen] = useState(false);
    const [showToolbar,setShowToolbar] = useState(false);
    const restaurantsRef = useRef(null);
    useEffect(()=>{
        props.onFetchProducts('',urlQueries.get('id'));
    },[])
    useEffect(()=>{
        if(restaurantsRef.current) setMenuTopPosition(restaurantsRef.current.getBoundingClientRect().top);
    
        document.addEventListener('scroll',handleWindowScroll);
        return () => {
            document.removeEventListener('scroll', handleWindowScroll);
        }
    });

    const handleWindowScroll = ()=>{
        if(restaurantsRef.current){
            if(restaurantsRef.current.getBoundingClientRect().top < 50){
                if(!showToolbar)
                setShowToolbar(prev=>!prev);
            }else{
                if(showToolbar)
                setShowToolbar(prev=>!prev);
            }
        }
    }

    const handleBackClick = ()=>{
        props.history.goBack();
    }

    const handleSnackBarBackDropClick = ()=>{
        setLoginSnackBarOpen(false);
        setSortFilterOpen(false);
        setPriceFilterOpen(false);
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


    const handleSetPriceFilterBtnClick = ([fromPrice,toPrice])=>{
        props.onSetFilter('marketcategory',props.search,props.sort,fromPrice,toPrice);
        const query = `?sort=${props.sort}&min_price=${fromPrice}&max_price=${toPrice}`
        props.onFetchProducts(query,urlQueries.get('id'));
        setPriceFilterOpen(false);
    }

    const handleSetSortFilterBtnClick = (data)=>{
        props.onSetFilter('marketcategory',props.search,data,props.min_price,props.max_price);
        const query = `?sort=${data}&min_price=${props.min_price}&max_price=${props.max_price}`
        props.onFetchProducts(query,urlQueries.get('id'));
        setSortFilterOpen(false);
    }

    return (
        <section className='bg-white min-h-screen pb-10'>
            <div className='h-52 bg-category-header p-6'>
                <span className='pt-5'><BackIcon onClick={handleBackClick} /></span>
                <div className='flex flex-row items-center text-4xl font-semibold mt-10'>
                    <img src={PizzaIcon} alt="pizaa" />
                <p className='mr-5'>{urlQueries.get('name')}</p>
                </div>
            </div>

            {props.productsLoading
            ? <Loading className='mt-10' />
            :<>
            <div className={classNames(showToolbar ? 'fixed top-0 left-0 right-0 bg-white z-50 animate-downanime shadow-accordion' : '')}>
            {showToolbar ? <Toolbar startIcon={<BackIcon />}>{urlQueries.get('name')}</Toolbar> : null }

            
            <ul className='pt-8 px-4 flex flex-row items-center overflow-auto flex-nowrap pb-5'>

                    {/* <li className='bg-gray-secondary px-6 py-2 rounded-full'>
                        <FilterIcon/>
                    </li> */}
                    <li className='bg-gray-secondary px-6 py-2 rounded-full flex flex-row items-center text-lg font-semibold mx-2 flex-nowrap whitespace-nowrap'
                    onClick={()=>setSortFilterOpen(true)}>
                        <ArrowDownIcon className='ml-2'/>
                        مرتب سازی
                    </li>

                    <li className='bg-gray-secondary px-6 py-2 rounded-full flex flex-row items-center text-lg font-semibold mx-2 flex-nowrap whitespace-nowrap'
                    onClick={()=>setPriceFilterOpen(true)}>
                        <ArrowDownIcon className='ml-2'/>
                        حدود قیمت
                    </li>
                    
                </ul>
            </div>
            
                <h6 className='text-3xl font-semibold my-7 px-6'>{props.products.length} نتیجه برای " {urlQueries.get('name')} "</h6>

                <ul ref={restaurantsRef}>
                {props.products.map(product=>(
                        <li className='flex-1 ml-4'><HorizentalProduct 
                        product={product} history={props.history}
                        cart={props.cart} onFavoriteClick={handleFavoriteClick} favorites={props.favorites}
                            isAuthenticated={props.isAuthenticated} handleAddToCartBtnClick={handleAddtoCart} handleRemoveFromCartBtnClick={handleRemoveFromCart}
                         /></li>
                    ))}
                </ul>
            </>}


            <SnackBar open={loginSnackBarOpen} onBackDropClick={handleSnackBarBackDropClick} className='overflow-y-auto'>
                <LoginIcon className='mx-auto mb-5'/>
                <p className='text-xl font-medium text-center mb-10'>.برای ثبت سفارش ابتدا باید وارد حساب کاربری خود شوید</p>
                <NavLink to='/auth'><ButtonPrimary className='ml-5'>ورود</ButtonPrimary></NavLink>
            </SnackBar>
            

            <PriceFilterSnackbar open={priceFilterOpen} onBackDropClick={handleSnackBarBackDropClick} onSetBtnClick={handleSetPriceFilterBtnClick}/>
            <SortFilterSnackBar open={sortFilterOpen} onBackDropClick={handleSnackBarBackDropClick} onSetBtnClick={handleSetSortFilterBtnClick}/>

        </section>
    );
};



const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null,
        products: state.market.products,
        productsLoading: state.market.productsLoading,
        favorites: state.favorite.favoriteItems,
        cart: state.cart.cart,
        cartOrder: state.cart.order,
        lastChangedItem: state.favorite.lastChangedItem,
        favoriteItemStatus: state.favorite.favoriteItemStatus,
        favoriteItemStatusMessage: state.favorite.favoriteItemStatusMessage,

        page: state.search.page,
        search: state.search.search,
        sort: state.search.sort,
        max_price: state.search.max_price,
        min_price: state.search.min_price,

    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onFetchProducts: (query,menuId) => dispatch(actions.fetchProducts(query,menuId)),
        onAddToCart: (token,restaurantSlug,itemId) => dispatch(actions.addCartItem(token,restaurantSlug,itemId)),
        onRemoveCartItem: (token,orderId,itemId) => dispatch(actions.removeCartItem(token,orderId,itemId)),
        onFetchCart: (token) => dispatch(actions.fetchCart(token)),
        onAddItemToFavorite: (token,itemIds) => dispatch(actions.addItemFavorite(token,itemIds)),
        onResetFavoriteStatus: () => dispatch(actions.resetFavorite()),
        onFetchFavorites: (token) => dispatch(actions.fetchFavorites(token)),
        onSetFilter: (page,search,sort,minPrice,maxPrice) => dispatch(actions.setFilter(page,search,sort,minPrice,maxPrice)),

    }
  }

export default connect( mapStateToProps, mapDispatchToProps )(ProductsByCategory);