import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import Toolbar from '../../../components/Ui/Toolbar/Toolbar';
import {ReactComponent as BackIcon} from '../../../assets/svgs/backIcon.svg'
import {ReactComponent as HeartBorderBlackIcon} from '../../../assets/svgs/heartBorderBlack.svg'
import {ReactComponent as FavoriteFillIcon} from '../../../assets/svgs/heartBlackIcon.svg';

import {ReactComponent as CategoryArrowIcon} from '../../../assets/svgs/categoryArrowIcon.svg'
import {ReactComponent as MinusIcon} from '../../../assets/svgs/minusIcon.svg'
import {ReactComponent as PlusIcon} from '../../../assets/svgs/plusIcon.svg'
import ProductImg from '../../../assets/img/product.png'
import Product1Img from '../../../assets/img/restaurant.png'
import { NavLink } from 'react-router-dom';
import { addCommas } from '../../../shared/utility';
import {ReactComponent as LoginIcon} from '../../../assets/svgs/message/login.svg'
import ButtonPrimary from '../../../components/Ui/Button/ButtonPrimary';
import SnackBar from '../../../components/Ui/SnackBar/SnackBar';
import VerticalProduct from '../../../components/Product/Vertical/Vertical';
import Loading from '../../../components/Loading/Loading';
import {ReactComponent as RecycleBinIcon} from '../../../assets/svgs/recycleBinGrayIcon.svg'

const Product = (props) => {
    const [product,setProduct] = useState(props.products.find(p => +p.id === +props.match.params.id));
    const [loginSnackBarOpen,setLoginSnackBarOpen] = useState(false);
    const [cartSnackBarOpen,setCartSnackBarOpen] = useState(false);

    
    const handleFavoriteClick = ()=>{
        if(props.isAuthenticated){
            props.onAddItemToFavorite(props.token,[product.id]);
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
        setCartSnackBarOpen(false);
        setLoginSnackBarOpen(false);
    }

    const handleAddToCartClick = (slug,itemId)=>{
        if(props.isAuthenticated){
            props.onAddToCart(props.token,0,itemId);
        }else{
            setLoginSnackBarOpen(prev=>!prev);
        }
    }

    const handleRemoveFromCartClick = (itemId)=>{
        if(props.isAuthenticated){
            props.onRemoveCartItem(props.token,props.cartOrder.id,itemId);
        }else{
            setLoginSnackBarOpen(prev=>!prev);
        }
    }

    const handleLookCartClick = ()=>{
        
        setCartSnackBarOpen(prev=>!prev);
    }


    const handleGotoCartClick = ()=>{
        props.history.push('/cart');
    }

    const handleBackClick = ()=>{
        props.history.goBack();
    }

    return (
        <section className='relative'>
            <Toolbar startIcon={<BackIcon onClick={handleBackClick}/>} endIcon={props.favorites.find(f=> +f.item_id === +product.id) 
                ?<FavoriteFillIcon /> : <HeartBorderBlackIcon />} endIconClick={handleFavoriteClick}>جزییات محصول</Toolbar>
                <figure className='w-full h-96'><img src={product.image} alt="product" className='w-full h-full ' /></figure>
            <div className='px-6 bg-white pt-5'>
                <h6 className='text-3xl font-semibold mt-5'>{product.name}</h6>
                <p className='text-md font-medium mt-5 text-gray-primary pb-6 border-b border-border-gray'>توضیحات اضافی این محصول</p>

                <div className='flex flex-row items-center justify-between mt-5'>
                    <div className='flex flex-row items-center flex-1'>
                            <NavLink to='#' className='flex flex-row items-center text-lg text-green-primary font-semibold ml-4'>
                            پروتئین
                            <CategoryArrowIcon className='mr-2'/>
                            </NavLink>
                            <NavLink to='#' className='flex flex-row items-center text-lg text-green-primary font-semibold ml-4'>
                            گوشت
                            <CategoryArrowIcon className='mr-2'/>
                            </NavLink>

                            <NavLink to='#' className='flex flex-row items-center text-lg text-green-primary font-semibold'>
                            900 گرم
                            <CategoryArrowIcon className='mr-2'/>
                            </NavLink>
                    </div>

                    {product.is_off === '1'?<span className='bg-red-primary text-lg text-white px-2 py-1 ml-2'>{product.off_percentage}%</span>:null}
                    {product.is_new === '1'?<span className='bg-primary text-lg text-white px-2 py-1'>جدید</span>:null}
                </div>

                <div className='flex flex-row justify-between mt-10 pb-8'>
            <div >
            {product.is_off === '1' ? <p className='text-md text-secondary'><strike>{addCommas(product.sell_price)}</strike></p> : null }
                        <p className='text-5xl font-bold'>
                        {addCommas(product.is_off === '1' ? product.off_sell_price : product.sell_price)}

                            <span className='text-md pr-1'>تومان</span>
                        </p>
            </div>
            {product.status === '1' ? <div className='text-3xl text-black flex flex-row items-center'>
                            {props.loading
                            ?<Loading className='w-8 h-8'/>
                            :<>
                            <button type='button' onClick={()=>handleAddToCartClick(0,product.id)} className='w-12 h-12 flex items-center justify-center bg-primary ml-4 rounded-md'><PlusIcon className='text-white stroke-current' /></button>
                                {props.cart.find(c=> c.item_id === `${product.id}`)?.count || 0}
                            <button type='button' onClick={()=>handleRemoveFromCartClick(product.id)} className='w-12 h-12 flex items-center justify-center mr-4 rounded-md border-2'>
                                {props.cart.find(c=> c.item_id === `${product.id}`)?.count == 1
                                ? <RecycleBinIcon />
                                :<MinusIcon />}
                                
                                </button>
                            </>}
                        </div> : null }
            </div>
                
            </div>

            <div className='bg-white mt-5 pb-32 px-6 pt-6'>
            <h6 className='text-4xl font-bold'>محصولات مشابه</h6>

            <ul className='flex items-center overflow-x-scroll flex-nowrap mt-2 py-5 px-2'>
                    {props.products.filter(item=> +item.id === +product.id).map(related=>(
                        <li><VerticalProduct 
                        product={product} history={props.history}
                        cart={props.cart} onFavoriteClick={handleFavoriteClick} favorites={props.favorites}
                            isAuthenticated={props.isAuthenticated} handleAddToCartBtnClick={handleAddToCartClick} handleRemoveFromCartBtnClick={handleRemoveFromCartClick}
                         /></li>
                    ))}
                </ul>
            </div>

            <SnackBar open={loginSnackBarOpen} onBackDropClick={handleSnackBarBackDropClick} className='overflow-y-auto'>
                <LoginIcon className='mx-auto mb-5'/>
                <p className='text-xl font-medium text-center mb-10'>.برای ثبت سفارش ابتدا باید وارد حساب کاربری خود شوید</p>
                <NavLink to='/auth'><ButtonPrimary className='ml-5'>ورود</ButtonPrimary></NavLink>
            </SnackBar>

            {/* {+props.cartOrder.count > 0
            ?<div className='fixed bottom-0 right-0 left-0 shadow-accordion flex items-center justify-center px-6 py-7 bg-white w-full'>
                <ButtonPrimary onClick={handleLookCartClick}>مشاهده سبد خرید ({props.cartOrder.count})</ButtonPrimary>
            </div>
            : null}

<SnackBar open={cartSnackBarOpen} onBackDropClick={handleSnackBarBackDropClick} className=''>
                <h6 className='text-center text-4xl font-semibold'>{product.restaurant_name}</h6>
                <p className='text-lg text-center text-secondary mt-3 pb-7 border-b border-border-gray'>{product.restaurant_name}</p>
                <ul className='mt-5 h-48 overflow-y-auto pb-5'>
                    {props.cart.map(cart=>(
                        <li className='flex flex-row justify-between items-start border-b border-border-gray py-3'>
                        <div>
                            <p className='text-xl font-medium'> {cart.item.name}</p>
                            <p className='text-4xl font-semibold mt-2'>
                                {addCommas(cart.is_off === '1' ? +cart.off_sell_price * +cart.count : +cart.sell_price * +cart.count)}
                                <span className='text-sm font-medium mr-2'>تومان</span>
                            </p>
                        </div>
                        <p className='text-3xl font-semibold bg-gray-secondary px-4 '>{cart.count}</p>
                    </li>
                    ))}

                    <button type='button' className='flex flex-row items-center justify-start text-xl p-7 bg-gray-secondary w-full my-5'>
                <PlusIcon className='text-primary stroke-current fill-current ml-5'/>
                    افزودن یادداشت
            </button>
                </ul>
            <ButtonPrimary onClick={handleGotoCartClick}>تسویه حساب</ButtonPrimary>

            </SnackBar> */}
        </section>
    );
};



const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null,
        banners: state.market.banners,
        bannerLoading: state.market.bannerLoading,
        categories: state.market.categories,
        categoriesLoading: state.market.categoriesLoading,
        products: state.market.products,
        productsLoading: state.market.productsLoading,
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


export default connect( mapStateToProps, mapDispatchToProps )(Product);