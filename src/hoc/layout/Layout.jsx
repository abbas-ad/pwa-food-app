import React, { useState,useEffect } from 'react';
import BottomNavigation from '../../components/Navigation/BottomNavigation/BottomNavigation';
import {ReactComponent as ArrowLeftIcon} from '../../assets/svgs/orderStep/arrowLeftIcon.svg'

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import ButtonPrimary from '../../components/Ui/Button/ButtonPrimary';
import ButtonSecondary from '../../components/Ui/Button/ButtonSecondary';
import Loading from '../../components/Loading/Loading';
import { NavLink } from 'react-router-dom';

import {ReactComponent as WarningIcon} from '../../assets/svgs/message/warningIcon.svg'
import SnackBar from '../../components/Ui/SnackBar/SnackBar';
import { addCommas } from '../../shared/utility';
import classNames from 'classnames';
import { useHistory } from 'react-router';

const paths = ['/restaurant','/account','/filter','/payment-result','/increase-wallet','/product','/favorites','/addresses','/new-address','/editaddress','/newnote','/category']
const cartPaths = ['/search','/restaurants','/category','/product']

const Layout = (props) => {
    const history = useHistory();
    const [cartSnackBarOpen,setCartSnackBarOpen] = useState(false);
    const [lastOrderCommentSnackBarOpen,setLastOrderCommentCartSnackBarOpen] = useState(false);

    useEffect(()=>{
        props.onFetchUser();
        props.onFetchLastOrderComment(props.token);
        props.onFetchOrders(props.token);
    },[]);

    useEffect(()=>{
       props.lastOrderComment?.orderId && setLastOrderCommentCartSnackBarOpen(true)
    },[props.lastOrderComment])

    const handleOkBtnClick = ()=>{
        props.onResetError();
    }

    
    const handleSnackBarBackDropClick = ()=>{
        setCartSnackBarOpen(false);
        setLastOrderCommentCartSnackBarOpen(false)
        };

        const handleLookCartClick = ()=>{
            setCartSnackBarOpen(prev=>!prev);
        };
    
        const handleGotoCartClick = ()=>{
            history.push('/cart');
        setCartSnackBarOpen(false);

        };

    return (
        <>
             
            {paths.some(path => props.location.pathname.includes(path)) ? null :  <BottomNavigation/>  }
            <main className='relative'>
            {+props.cartOrder.count > 0
            ? cartPaths.some(path => props.location.pathname.includes(path)) || props.location.pathname === '/home' 
            ? <div className={classNames('z-50 fixed right-0 left-0 shadow-accordion flex items-center justify-center px-6 py-7 bg-white w-full'
            ,props.location.pathname === '/home' || props.location.pathname === '/search' ? 'bottom-24' : 'bottom-0')}>
                <ButtonPrimary onClick={handleLookCartClick}>مشاهده سبد خرید ({props.cartOrder.count})</ButtonPrimary>
            </div> : null 
            : null}


            <SnackBar open={cartSnackBarOpen} onBackDropClick={handleSnackBarBackDropClick} className='z-50 h-half'>
            {props.cart ?  <div className='h-full flex flex-col'>

                <h6 className='text-center text-4xl font-semibold'>{props.cart[0]?.item?.restaurant_name}</h6>
                <p className='text-lg text-center text-secondary mt-3 pb-7 border-b border-border-gray'>
                {props.cartOrder.restaurant_slug !== '0' ? props.cart[0]?.item?.restaurant_address  : ''}
                    </p>
                <ul className='flex-1 mt-5 overflow-y-auto pb-5'>
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
                    </ul>

                    {/* <button type='button' className='flex flex-row items-center justify-start text-xl p-7 bg-gray-secondary w-full my-5'>
                <PlusIcon className='text-primary stroke-current fill-current ml-5'/>
                    افزودن یادداشت
            </button> */}

                <ButtonPrimary onClick={handleGotoCartClick} className=''>تسویه حساب</ButtonPrimary>
  
                </div> : null }

            </SnackBar>
                {props.children}

                <SnackBar open={props.error}  className='overflow-y-auto'>
                <WarningIcon className='mx-auto mb-5'/>
                <p className='text-xl font-medium text-center mb-10'>
                    {props.error}
                </p>
                <ButtonPrimary className='ml-5' onClick={handleOkBtnClick}>فهمیدم</ButtonPrimary>
            </SnackBar>

            <SnackBar open={lastOrderCommentSnackBarOpen} onBackDropClick={handleSnackBarBackDropClick} className='overflow-y-auto'>
                <WarningIcon className='mx-auto mb-5'/>
                <p className='text-xl font-medium text-center mb-5'>
                    با ثبت نظر خود مارا در ارائه هرچه بهتر خدمات یاری کنید
                </p>
                <div className='flex flex-row items-center mb-10'>
                <ul className='flex flex-row items-center'>
                    {props.orders.filter(o=> +o.status === 6)[0]?.orderItems.slice(0,3).map(item=>(
                        <li className='ml-2'>
                        <figure className='w-20 h-20'><img className='w-full h-full' src={item.item.image} alt="menu1" /></figure>
                    </li>
                    ))}
                </ul>

                {props.orders.filter(o=> +o.status === 6)[0]?.orderItems.length > 3 ? <p className='flex-1 text-3xl font-medium mr-3'>{props.orders.filter(o=> +o.status === 6)[0]?.orderItems.length - 3} +</p> : null}

                <NavLink to={+props.orders.filter(o=> +o.status === 6)[0]?.status  === 1 ? `/cart` :`/order/${props.orders.filter(o=> +o.status === 6)[0]?.id}`} 
                onClick={handleSnackBarBackDropClick}
                className='flex flex-row text-xl text-secondary items-center font-medium flex-1 justify-end'>
                        جزییات
                        <span className='mr-3'><ArrowLeftIcon className='fill-current'/></span>
                    </NavLink>


            </div>
                <div className='flex items-center justify-between'>
                <NavLink to={+props.orders.filter(o=> +o.status === 6)[0]?.status  === 1 ? `/cart` :`/order/${props.orders.filter(o=> +o.status === 6)[0]?.id}`} 
                onClick={handleSnackBarBackDropClick}
                className='ml-5 flex-1'>
                    <ButtonPrimary className=' flex-1' >افزودن نظر</ButtonPrimary>          
                   </NavLink>

                    <ButtonSecondary className='flex-30' onClick={handleSnackBarBackDropClick}>رد</ButtonSecondary>
                </div>
            </SnackBar>
            </main>
        </>
    );
};

  
const mapStateToProps = state => {
    return {
        token: state.auth.token,
        error: state.error.error,
        cartOrder: state.cart.order,
        cart: state.cart.cart,
        orders: state.order.orders,
        lastOrderComment: state.restaurant.lastOrderComment
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onFetchUser: () => dispatch(actions.fetchUser()),
        onFetchLastOrderComment: (token) => dispatch(actions.fetchLastOrderComment(token)),
        onResetError: () => dispatch(actions.resetError()),
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),

    }
  }
export default connect( mapStateToProps, mapDispatchToProps )(Layout);