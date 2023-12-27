import React, { useEffect, useState } from 'react';
import Toolbar from '../../components/Ui/Toolbar/Toolbar';
import Menu from '../../components/Menu/Menu';
import AccordionItem from '../../components/Ui/Accordion/Accordion';
import ButtonPrimary from '../../components/Ui/Button/ButtonPrimary';
import {ReactComponent as BackIcon} from '../../assets/svgs/backIcon.svg'

import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import { addCommas } from '../../shared/utility';
const formatDateOption = {  year: 'numeric', month: 'numeric', day: 'numeric' };
const formatTimeOption = {  hour: '2-digit', minute: '2-digit' };
const Order = (props) => {
    const [order,setOrder] = useState(props.orders.find(o => +o.id === +props.match.params.id));

    useEffect(()=>{
        props.onCheckCanAddComment(props.token,props.match.params.id);
    },[])
    const handleBackClick = ()=>{
        props.history.goBack();
    }

    
    return (
        <section className='bg-white pb-52 relative'>
            <Toolbar startIcon={<BackIcon onClick={handleBackClick}/>}>جزییات سفارش</Toolbar> 
            
            <div className='mt-5 shadow-accordion p-6'>
                <div className='flex flex-row items-center justify-between border-b border-border-gray pb-10 text-green-primary text-3xl font-semibold'>
                    <p>کد رهگیری : </p>
                    <p>{order.id}</p>
                </div>

                <div className='flex flex-row items-center justify-between text-md text-secondary font-medium mt-5'>
                <p >تاریخ ثبت سفارش : </p>
                <p className=''>{` ${new Date(order.created_at).toLocaleString('fa-IR',formatTimeOption)} - ${new Date(order.created_at).toLocaleString('fa-IR',formatDateOption)}`}</p>

            </div>

            <h6 className='text-center font-bold text-4xl mt-10'>{order.orderRestaurant.name}</h6>
            <p className='text-lg text-center text-secondary mt-3'>{order.orderRestaurant.address}</p>

            </div>

            <ul className=' pb-2'>
                {/* <li><Menu favorite quantity={23} new off    /></li>
                <li><Menu favorite quantity={23} new off    /></li>
                <li><Menu favorite quantity={23} new off    /></li>
                <li><Menu favorite quantity={23} new off    /></li> */}
            </ul>

            <div className=' shadow-accordion p-6 mt-5'>
                <h6 className='text-xl font-semibold mb-7'>جزییات صورت حساب</h6>
                <div className='flex flex-row items-center text-lg justify-between border-t border-border-gray py-5'>
                    <p className='text-secondary font-medium'>هزینه رستوران : </p>
                    <p className='text-secondary font-medium'>
                        {addCommas(order.price)} تومان
                    </p>
                </div>
                <div className='flex flex-row items-center text-lg justify-between border-t border-border-gray py-5'>
                    <p className='text-secondary font-medium'>هزینه پیک : </p>
                    <p className='text-secondary font-medium'>
                        {addCommas(order.delivery_price)} تومان
                    </p>
                </div>
                <div className='flex flex-row items-center justify-between text-lg border-t border-border-gray py-5'>
                    <p className='font-semibold'>هزینه کل : </p>
                    <p className='font-medium'>
                        {addCommas(order.total_price)} تومان
                    </p>
                </div>
                <div className='flex flex-row items-center justify-between text-lg border-t border-border-gray py-5'>
                    <p className='font-semibold'>نوع پرداخت : </p>
                    <p className='font-medium'>
                        {order.payment_type === 'online' ? 'درگاه پرداخت' : ''}
                        {order.payment_type === 'wallet' ? 'کیف پول' : ''}
                        {order.payment_type === 'cash' ? 'پرداخت در محل' : ''}
                    </p>
                </div>
            </div>

            <div className=' shadow-accordion p-6 mt-5'>
                <div className='flex flex-row items-center text-lg justify-between pb-5'>
                    <p className='text-secondary font-medium'>تحویل گیرنده : </p>
                    <p className=' font-medium'>
                        {order.full_name}
                    </p>
                </div>
                <div className='flex flex-row items-center text-lg justify-between border-t border-border-gray py-5'>
                    <p className='text-secondary font-medium'>شماره تماس : </p>
                    <p className=' font-medium'>
                        {order.phone}
                    </p>
                </div>
                <div className='text-lg border-t border-border-gray py-5'>
                    <p className='font-medium text-secondary'>ارسال به : </p>
                    <p className='font-medium mt-3'>
                        {order.address}
                    </p>
                </div>
            </div>

            <div className='py-6 mt-5 shadow-accordion px-6'>
               <AccordionItem title={'یادداشت شما'} index={1} className='' id='note'>
            <div className='px-6'>
            <p className='text-justify text-lg font-medium pt-5 border-t border-border-gray'>
                {order.description}
                </p>
            </div>
            
        </AccordionItem>
            
            </div>
                {+order.status === 6 && props.canAddComment === 'can' && <NavLink to={`/restaurants/${order.restaurant_slug}/comments?order=${order.id}`} className='fixed bottom-24 left-0 right-0'>
                    <ButtonPrimary className=' bg-green-primary'>ثبت نظر برای این سفارش</ButtonPrimary>
                </NavLink>}
        </section>
    );
};


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.order.loading,
        orders: state.order.orders,
        canAddComment: state.restaurant.canAddCommentStatus
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onCheckCanAddComment: (token,orderId) => dispatch(actions.checkCanAddComment(token,orderId)),
    }
  }
export default connect( mapStateToProps, mapDispatchToProps )(Order);