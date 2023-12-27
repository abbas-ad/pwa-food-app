import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Order from '../../components/Order/Order';
import ButtonPrimary from '../../components/Ui/Button/ButtonPrimary';
import ButtonSecondary from '../../components/Ui/Button/ButtonSecondary';
import SnackBar from '../../components/Ui/SnackBar/SnackBar';
import {ReactComponent as WarningIcon} from '../../assets/svgs/message/warningIcon.svg'
import {ReactComponent as SupportIcon} from '../../assets/svgs/supportIcon.svg'
import InputPrimary from '../../components/Ui/Input/InputPrimary';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Loading from '../../components/Loading/Loading'
import { useForm } from "react-hook-form";
import {ReactComponent as NoCompleteOrderIcon} from '../../assets/svgs/message/noCompleteOrderIcon.svg'
import {ReactComponent as NoInProccessOrderIcon} from '../../assets/svgs/message/noInProccessOrderIcon.svg'
import OrderShimmer from '../../components/ShimmerLoading/Order/OrderShimmer';


const Orders = (props) => {
    const [ordersStatus,setOrdersStatus] = useState('inprocess')
    const [cancelSnackBarOpen,setCancelSnackBarOpen] = useState(false);
    const [followUpSnackBarOpen,setFollowUpSnackBarOpen] = useState(false);
    const [fillInputErrorSnackBar,setFillInputErrorSnackBar] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors }
      } = useForm();


    useEffect(()=>{
        props.onFetchOrders(props.token);
    },[])

    const handleCancelOrderClick = (e)=>{
        e.stopPropagation();
        setCancelSnackBarOpen(prev=>!prev);
    }
    const handleFollowUpClick = (e)=>{
        e.stopPropagation();
        setFollowUpSnackBarOpen(prev=>!prev);
    }

    const handleSnackBarBackDropClick = ()=>{
        setCancelSnackBarOpen(false);
        setFollowUpSnackBarOpen(false);
        setFillInputErrorSnackBar(false);
    }

    const handleCancelOrder = ()=>{
        props.onCancelOrder(props.token);
    }

    useEffect(()=>{
        if(props.cancelOrderResult === 'success'){
            handleSnackBarBackDropClick();
            props.onFetchOrders(props.token);
            props.onResetOrderInfoResult();
        }
    },[props.cancelOrderResult]);

    const handleSubmitFollowOrder = (data)=>{
        const isWrong = data.isWrong ? '1' : '0';
        const isNotDelivered = data.isNotDelivered ? '1' : '0';
        if(isWrong === '0' && isNotDelivered === '0' ){
         setFillInputErrorSnackBar(true);
        }else{
            props.onFollowOrder(props.token,isWrong,isNotDelivered,data.description || 'بدون توضیح');
        }
    }

    
    useEffect(()=>{
        if(props.followOrderResult === 'success'){
            handleSnackBarBackDropClick();
            props.onFetchOrders(props.token);
            props.onResetOrderInfoResult();
        }else if(props.followOrderResult === 'failed'){
            handleSnackBarBackDropClick();
        }
    },[props.followOrderResult]);
    return (
        <section className='pb-24 relative min-h-screen bg-white'>
            <div className='bg-white pt-5 shadow-sm'>
                <h6 className='text-center text-4xl font-yekan-medium'>سفارشات شما</h6>
                <div className='flex flex-row pt-7 text-xl px-10 items-center justify-around text-gray-primary'>
                    <button className={ordersStatus === 'inprocess' ? 'border-b-2 border-green-primary text-green-primary ml-10 pb-5 outline-none' : 'pb-5 outline-none'} type='button' onClick={()=>setOrdersStatus('inprocess')}>درحال انجام</button>
                    <button className={ordersStatus === 'completed' ? 'border-b-2 border-green-primary text-green-primary mr-10 pb-5 outline-none' : 'pb-5 outline-none'} type='button' onClick={()=>setOrdersStatus('completed')}>تکمیل شده</button>
                </div>
            </div>

            {ordersStatus === 'inprocess' && props.orders.filter(order=> order.status != 6).length < 1 && !props.loading
           ?<div className='absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2'>
           <NoInProccessOrderIcon className='mx-auto'/>
           <p className='text-xl text-center mt-7 whitespace-nowrap'>هنوز سفارش در حال انجامی وجود ندارد !</p>
                 </div>
            : null}

             {ordersStatus !== 'inprocess' && props.orders.filter(order=> order.status == 6).length < 1 && !props.loading
            ?   <div className='absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2'>
                    <NoCompleteOrderIcon className='mx-auto'/>
                    <p className='text-xl text-center mt-7 whitespace-nowrap'>هنوز سفارش تکمیل شده ای وجود ندارد !</p>
                </div>
            : null}

            {props.loading
            ? <Loading className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
            //  <ul className='mt-5'>
            //     <li className='mb-3'><OrderShimmer /></li>
            //     <li className='mb-3'><OrderShimmer /></li>
            //     <li className='mb-3'><OrderShimmer /></li>
            //     <li className='mb-3'><OrderShimmer /></li>
            //     <li className='mb-3'><OrderShimmer /></li>
            // </ul>
            :<>
            <ul className='mt-5'>
            {ordersStatus === 'inprocess'
            ?props.orders.filter(order=> order.status != 6).map(order=>(
                <li className='mb-3'><Order order={order} onCancelBtnClick={handleCancelOrderClick} onFollowUpBtnClick={handleFollowUpClick}/></li>
            ))
            :props.orders.filter(order=> order.status == 6).map(order=>(
                <li className='mb-3'><Order order={order} onCancelBtnClick={handleCancelOrderClick} onFollowUpBtnClick={handleFollowUpClick}/></li>
            ))
        }
            
                
            </ul>

            <SnackBar open={cancelSnackBarOpen} onBackDropClick={handleSnackBarBackDropClick} className='overflow-y-auto'>
                <WarningIcon className='mx-auto mb-5'/>
               <p className='text-xl font-medium text-center mb-10'>آیا می خواهید این سفارش را لغو کنید؟</p>
               <div className='flex flex-row items-start'>
                   {props.cancelLoading
                   ? <Loading />
                    :<>
                        <ButtonPrimary type='button' className='ml-5' onClick={handleCancelOrder}>بله ، لغو سفارش</ButtonPrimary>
                        <ButtonSecondary type='button' onClick={handleSnackBarBackDropClick}>بازگشت</ButtonSecondary>
                    </>}
                   
               </div>
            </SnackBar>

            <SnackBar open={followUpSnackBarOpen} onBackDropClick={handleSnackBarBackDropClick} className='overflow-y-auto'>
               <p className='text-3xl font-semibold text-center border-b border-border-gray pb-7'>پیگیری سفارش</p>
               <form onSubmit={handleSubmit(handleSubmitFollowOrder)}>
                    <div className='ma-checkbox mt-5'>
                            <input type="checkbox" id="wrong-send-checkbox" className='hidden' {...register("isWrong")}/>
                              <label htmlFor="wrong-send-checkbox" className='flex flex-row items-center text-3xl'>
                                 ارسال اشتباه
                            </label>
                          </div>

                          <div className='ma-checkbox mt-5'>
                            <input type="checkbox" id="notsend-checkbox" className='hidden' {...register("isNotDelivered")}/>
                              <label htmlFor="notsend-checkbox" className='flex flex-row items-center text-3xl'>
                                 سفارش به دست من نرسیده !
                            </label>
                          </div>

                          <InputPrimary className='mb-5' placeholder='مشکل شما بین گزینه های بالا نبود ؟ اینجا بنویسید' register={register} name='description'
                            errors={errors}  validation={{}}/>
                          <ButtonSecondary type='button' className='flex flex-row items-center text-3xl font-medium px-4 mb-5' onClick={()=>window.open('tel:09384400800')}>
                              <SupportIcon  />
                              <span className='flex-1 text-right px-4'>پشتیبانی</span>
                              09384400800
                          </ButtonSecondary>
                   {props.followLoading ? <Loading /> : <ButtonPrimary type='submit' className='ml-5'>ارسال</ButtonPrimary>}
                          
               </form>
              
            </SnackBar>


            <SnackBar open={fillInputErrorSnackBar} className='overflow-y-auto'>
                <WarningIcon className='mx-auto mb-5'/>
                <p className='text-xl font-medium text-center mb-10'>
                    لطفا برای پیگیری سفارش یک گزینه را انتخاب کنید
                </p>
                <ButtonPrimary className='ml-5' onClick={()=>setFillInputErrorSnackBar(false)}>فهمیدم</ButtonPrimary>
            </SnackBar>
            </>}
            
        </section>
    );
};


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.order.loading,
        orders: state.order.orders,
        cancelLoading: state.order.cancelLoading,
        cancelOrderResult: state.order.cancelOrderResult,
        followLoading: state.order.followLoading,
        followOrderResult: state.order.followOrderResult
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
        onCancelOrder: (token) => dispatch(actions.cancelOrder(token)),
        onFollowOrder: (token,isWrong,isNotDelivered,description) => dispatch(actions.saveFollowOrderInfo(token,isWrong,isNotDelivered,description)),
        onResetOrderInfoResult: () => dispatch(actions.resetOrderInfoResult())
    }
  }

export default connect( mapStateToProps, mapDispatchToProps )(Orders);