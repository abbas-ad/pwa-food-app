import React, { useState, useEffect } from 'react';
import Toolbar from '../../components/Ui/Toolbar/Toolbar';
import {ReactComponent as ArrowIcon} from '../../assets/svgs/arrowUp.svg'
import {ReactComponent as LocationIcon} from '../../assets/svgs/locationIcon.svg'
import {ReactComponent as PlusIcon} from '../../assets/svgs/plusIcon.svg'
import AccordionItem from '../../components/Ui/Accordion/Accordion';
import SnackBar from '../../components/Ui/SnackBar/SnackBar';
import {ReactComponent as WarningIcon} from '../../assets/svgs/message/warningIcon.svg'
import {ReactComponent as BackIcon} from '../../assets/svgs/backIcon.svg'

import {ReactComponent as EditIcon } from '../../assets/svgs/accountEditIcon.svg'
import {ReactComponent as RecycleBinIcon } from '../../assets/svgs/recyclebinIcon.svg'
import MenuItem from '../../components/Menu/Menu';
import { NavLink } from 'react-router-dom';
import ButtonPrimary from '../../components/Ui/Button/ButtonPrimary';
import HorizentalProduct from '../../components/Product/Horizental/Horizental';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import _ from 'lodash';
import classNames from 'classnames';
import { addCommas } from '../../shared/utility';
import Loading from '../../components/Loading/Loading';

const Cart = (props) => {
    const [noteOpen,setNoteOpen] = useState(props.note);
    const [continueOrder,setContinueOrder] = useState(false);
    const [noAddressSnackBar,setNoAddressSnackBar] = useState(false);
    const [address,serAddress] = useState(props.addresses.find(address=> address.id === +props.selectedAddress));
    const [offerMenuSnackBarOpen,setOfferMenuSnackBarOpen] = useState(false);

    useEffect(()=>{
        props.onFetchNote();
        props.onFetchCart(props.token);
        props.onFetchRecommendedItems(props.token)
    },[])

    const handleNextLevelClick = ()=>{
        if(address){
            props.onSaveOrderInfo(props.token,+props.selectedAddress,props.note);
        }else{
            setNoAddressSnackBar(true);
        }
    }

    const handleSnackBarBackDropClick = ()=>{
        setOfferMenuSnackBarOpen(false);
        setNoAddressSnackBar(false);
    }


    const handleAddtoCart = (resaurantSlug,itemId)=>{
        props.onAddToCart(props.token,resaurantSlug,itemId);
        setContinueOrder(true)
    }

    const handleRemoveFromCart = (itemId)=>{
        props.onRemoveCartItem(props.token,props.cartOrder.id,itemId);
    }

    const handleRemoveNoteBtnClick = ()=>{
        props.onRemoveNote();
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

    useEffect(()=>{
        if(props.saveOrderInfoResult === 'success'){
            setOfferMenuSnackBarOpen(prev=>!prev);
        }
    },[props.saveOrderInfoResult]);

    const handleChangeNote = (v)=>{
        props.onAddNote(v.target.value);
    };

    const handleBackIconClick = ()=>{
        props.history.goBack();
    }

    useEffect(()=>{
        if(props.cart.length < 1){
            props.history.goBack();
        }
    },[props.cart])
    
    return (
        <section className='pb-52 bg-white relative'>
            <Toolbar startIcon={<BackIcon onClick={handleBackIconClick} />}>سبد خرید</Toolbar> 
            
            <NavLink to='/addresses?redirect=true' className='flex flex-row items-center shadow-accordion mt-5 p-6'>
            <span><LocationIcon /></span>

            <div className='px-5 flex-1'>
                {!address ? <p className='text-xl font-medium my-5'>لطفا آدرس خود را وارد کنید</p> : null}
                {address ? <p className='text-xl font-semibold mb-5'>{`${address?.city} - ${address?.neighbourhood}`}</p> : null}
                {address ? <p className='text-lg font-medium text-secondary'>{`${address?.street} - ${address?.address}`}</p> : null}
            </div>
            <span className='text-xl transform -rotate-90'><ArrowIcon /></span>
        </NavLink>

        <ul className=' pb-2'>
                {props.cart.map(cart=>(
                    cart.item.restaurant_slug === '0'
                    ?<li className=''><HorizentalProduct 
                    product={cart.item} history={props.history}
                    cart={props.cart} onFavoriteClick={handleFavoriteClick} favorites={props.favorites}
                        isAuthenticated={props.isAuthenticated} 
                        handleAddToCartBtnClick={handleAddtoCart} handleRemoveFromCartBtnClick={handleRemoveFromCart}
                     /></li>
                    :
                    <li className=''><MenuItem key={cart.item.id} menu={cart.item} 
                        cart={props.cart} restaurantInfo
                        isAuthenticated={props.isAuthenticated} 
                        favorites={props.favorites}
                        
                        handleAddToCartBtnClick={handleAddtoCart} 
                        handleRemoveFromCartBtnClick={handleRemoveFromCart}/></li>
                 ))}
            </ul>

            <div className='px-32 py-8'>
                <NavLink to={props.cartOrder.restaurant_slug === '0' ? '/' :`/restaurants/${props.cartOrder.restaurant_slug}`} className='flex flex-row items-center rounded-full justify-center p-5 bg-gray-secondary text-primary text-xl font-medium'>
                    <PlusIcon className='text-primary stroke-current fill-current ml-5'/>
                    اضافه کردن سفارش
                </NavLink>
            </div>


            <div className=' shadow-accordion p-6'>
                <h6 className='text-xl font-semibold mb-7'>جزییات صورت حساب</h6>
                <div className='flex flex-row items-center justify-between border-t border-border-gray py-5'>
                    <p className='text-lg text-secondary font-medium'>هزینه رستوران : </p>
                    <p className='text-lg text-secondary font-medium'>
                        {addCommas(props.cartOrder.total_price)} تومان
                    </p>
                </div>
                <div className='flex flex-row items-center justify-between border-t border-border-gray py-5'>
                    <p className='text-lg text-secondary font-medium'>هزینه پیک : </p>
                    <p className='text-lg text-secondary font-medium'>
                        {addCommas(props.cartOrder.delivery_price)} تومان
                    </p>
                </div>
                <div className='flex flex-row items-center justify-between border-t border-border-gray py-5'>
                    <p className='text-lg font-semibold'>هزینه کل : </p>
                    <p className='text-lg font-medium'>
                        {addCommas((+props.cartOrder.delivery_price)+(+props.cartOrder.total_price))} تومان
                    </p>
                </div>
            </div>

            <div className={classNames('py-6 mt-5 px-6')}>
                <textarea value={props.note} onChange={handleChangeNote} style={{resize: 'none'}} className='text-xl border border-border-gray w-full p-3 outline-black' name="" id="" rows="2" placeholder='افزودن یادداشت'></textarea>
                
            </div>

                {props.orderLoading ? <Loading className='fixed bottom-28 left-0 right-0' /> : <ButtonPrimary className='fixed bottom-24 left-0 right-0' type='button' onClick={handleNextLevelClick}>مرحله بعد</ButtonPrimary> }


            <SnackBar open={offerMenuSnackBarOpen} onBackDropClick={handleSnackBarBackDropClick} className='h-half z-50'>
                <div className='h-full flex flex-col'>
                    
 
                <p className='text-4xl font-semibold mb-10'>پیشنهادات ما</p>

                <ul className='mb-5 -mx-6 flex-1 overflow-y-auto'>
                    {props.recommendedItems.map(item=>(
                            <MenuItem menuInfo={item} key={item.id} menu={item} 
                            cart={props.cart} onFavoriteClick={handleFavoriteClick} favorites={props.favorites}
                            isAuthenticated={props.isAuthenticated} handleAddToCartBtnClick={handleAddtoCart} handleRemoveFromCartBtnClick={handleRemoveFromCart}/>
                        ))}
                </ul>

                <NavLink to='/payment' >
                <ButtonPrimary>
                    {continueOrder 
                    ? 'ادامه پرداخت'
                    : 'نه ممنون'}
                    </ButtonPrimary>
                </NavLink>
                </div>
            </SnackBar>

            <SnackBar open={noAddressSnackBar}  onBackDropClick={handleSnackBarBackDropClick}  className='overflow-y-auto'>
                <WarningIcon className='mx-auto mb-5'/>
                <p className='text-xl font-medium text-center mb-10'>
                    آدرس خود را انتخاب کنید 
                </p>
                <ButtonPrimary className='ml-5' onClick={handleSnackBarBackDropClick}>فهمیدم</ButtonPrimary>
            </SnackBar>
        </section>
    );
};


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token,
        addresses: state.user.addresses,
        selectedAddress: state.user.selectedAddress,
        cart: state.cart.cart,
        cartOrder: state.cart.order,
        note: state.user.note,
        orderLoading: state.order.loading,
        recommendedItems: state.order.recommendedItems,
        favorites: state.favorite.favoriteItems,
        saveOrderInfoResult: state.order.saveOrderInfoResult,
        orderLoading: state.order.loading
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onFetchRestaurant: (slug) => dispatch(actions.fetchRestaurant(slug)),
        onFetchRestaurantMenuItems: (slug) => dispatch(actions.fetchRestaurantMenuItems(slug)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
        onAddToCart: (token,restaurantSlug,itemId) => dispatch(actions.addCartItem(token,restaurantSlug,itemId)),
        onRemoveCartItem: (token,orderId,itemId) => dispatch(actions.removeCartItem(token,orderId,itemId)),
        onFetchCart: (token) => dispatch(actions.fetchCart(token)),
        onFetchNote: () => dispatch(actions.fetchNote()),
        onRemoveNote: () => dispatch(actions.removeNote()),
        onFetchRecommendedItems: (token) => dispatch(actions.fetchRecommendedItems(token)),
        onAddItemToFavorite: (token,itemIds) => dispatch(actions.addItemFavorite(token,itemIds)),
        onResetFavoriteStatus: () => dispatch(actions.resetFavorite()),
        onSaveOrderInfo: (token,addressId,description) => dispatch(actions.saveOrderInfo(token,addressId,description)),
        onResetOrderInfoResult: () => dispatch(actions.resetOrderInfoResult()),
        onAddNote: (note) => dispatch(actions.addNote(note)),

    }
  }

export default connect( mapStateToProps, mapDispatchToProps )(Cart);