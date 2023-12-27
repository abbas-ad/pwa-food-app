import React, { useEffect,useState } from 'react';
import Toolbar from '../../components/Ui/Toolbar/Toolbar';
import {ReactComponent as GetWayIcon} from '../../assets/svgs/payment/getwayIcon.svg'
import {ReactComponent as WalletIcon} from '../../assets/svgs/payment/walletIcon.svg'
import {ReactComponent as CashIcon} from '../../assets/svgs/payment/cashIcon.svg'
import {ReactComponent as WarningIcon} from '../../assets/svgs/message/warningIcon.svg'
import CheckIcon from '../../assets/svgs/checkIcon.svg'
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Payment.module.scss'
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import ButtonPrimary from '../../components/Ui/Button/ButtonPrimary';
import { useForm } from "react-hook-form";
import Loading from '../../components/Loading/Loading'
import { addCommas } from '../../shared/utility';
const Payment = (props) => {

    const {
        handleSubmit,
        register,
        formState: { errors }
      } = useForm();

      const handleFormSubmit = (data)=>{
          if(data.privicy){
              if(data.method === 'online') props.onOnlinePayment(props.token);   
             if(data.method === 'wallet') props.onWalletPayment(props.token);
              if(data.method === 'incash') props.onInCashPayment(props.token);
          }
    }


    useEffect(()=>{
        if(props.paymentResult === 'success'){
            props.onResetPaymentResult();
            props.history.push('/payment-result');
        }
    },[props.paymentResult]);

    return (
        <section className='h-screen bg-white relative'>
            <Toolbar>روش پرداخت</Toolbar> 
            <h1 className='text-xl font-bold mt-20 px-6'>
                 پرداخت 
                <span className='text-green-primary mx-2 font-medium'> {addCommas((+props.cartOrder.delivery_price)+(+props.cartOrder.total_price))}   تومان </span>
                با  : 
            </h1>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className='flex flex-row items-center px-6 mt-20'>
                <div className='flex-1 flex flex-col items-center justify-center'>
                    <GetWayIcon />
                    <p className='text-lg font-medium my-5'>درگاه پرداخت</p>
                    <input type="radio" id='slecet-checkbox' defaultChecked={true} value='online' {...register("method")} className={classes.CustomSelect}/>
                    <label htmlFor="slecet-checkbox" className='shadow-accordion'></label>
                </div>
                <div className='flex-1 flex flex-col items-center justify-center '>
                    <WalletIcon />
                    <p className='text-lg font-medium my-5'>کیف پول</p>
                    <input type="radio" id='slecet-checkbox2' value='wallet'  {...register("method")} className={classes.CustomSelect}/>
                    <label htmlFor="slecet-checkbox2" className='shadow-accordion'></label>
                </div>
                <div className='flex-1 flex flex-col items-center justify-center'>
                    <CashIcon />
                    <p className='text-lg font-medium my-5'>پرداخت در محل</p>
                    <input type="radio" id='slecet-checkbox3' value='incash' {...register("method")} className={classes.CustomSelect}/>
                    <label htmlFor="slecet-checkbox3" className='shadow-accordion'></label>
                </div>
            </div>
            
            <div>

            </div>

            <div className='fixed bottom-24 right-0 left-0'>
                        <div className={classNames(classes.RememberMe,'px-6 mb-5')}>
                            <input type="checkbox" id="remember-check" className='hidden' {...register("privicy")}/>
                              <label htmlFor="remember-check" className='flex flex-row items-center text-xl'>
                               
                                <NavLink to='#' className='text-green-primary ml-2'> قوانین و مقررات  </NavLink>
                                 را خواندم و قبول دارم.
                                </label>
                          </div>

                     {props.loading ? <Loading className='mb-7' /> :<ButtonPrimary type='submit' >پرداخت</ButtonPrimary> }
            </div>
            </form>
        </section>
    );
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        paymentResult: state.order.paymentResult,
        loading: state.order.loading,
        cartOrder: state.cart.order,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onInCashPayment: (token) => dispatch(actions.inCashPayment(token)),
        onOnlinePayment: (token) => dispatch(actions.onlinePayment(token)),
        onWalletPayment: (token) => dispatch(actions.walletPayment(token)),
        onResetPaymentResult: () => dispatch(actions.resetPaymentResult()),
    }
  }
export default connect( mapStateToProps, mapDispatchToProps )(Payment);