import React,{useEffect} from 'react';
import Toolbar from '../../components/Ui/Toolbar/Toolbar';
import {ReactComponent as BackIcon} from '../../assets/svgs/backIcon.svg'
import {ReactComponent as IncreaseIcon} from '../../assets/svgs/increaseIcon.svg'
import {ReactComponent as DecreaseIcon} from '../../assets/svgs/decreaseIcon.svg'
import {ReactComponent as NoTransacntionIcon} from '../../assets/svgs/message/noTransaction.svg'
import ButtonPrimary from '../../components/Ui/Button/ButtonPrimary';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import { NavLink } from 'react-router-dom';
import { addCommas,convertToJalaliDate } from '../../shared/utility';
import Loading from '../../components/Loading/Loading';
import TransactionShimmer from '../../components/ShimmerLoading/Transaction/TransactionShimmer';

const Wallet = (props) => {

    useEffect(()=>{
        props.onFetchWallet(props.token);
    },[]);

    const handleBackClick = ()=>{
        props.history.goBack();
    }
    return (
        <section className='bg-white pb-24 min-h-screen relative'>
            <Toolbar startIcon={<BackIcon onClick={handleBackClick}/>}>کیف پول</Toolbar>
            <div className='px-6'>
                <div className='flex flex-row items-center mt-12 border border-border-gray p-6'>
                    <p className='text-xl text-gray-primary'>موجودی : </p>
                    <p className='flex-1 text-4xl ml-3 text-left font-yekan-medium'>{addCommas(+props.wallet)}</p>
                    <span className='text-lg text-gray-primary'>تومان</span>
                </div>
                <NavLink to='/increase-wallet'>
                    <ButtonPrimary className='mt-8'>افزایش موجودی</ButtonPrimary>
                </NavLink>

                {props.walletTransactions.length < 1 && !props.loading
                ?<div className='absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2'>
                <NoTransacntionIcon className='mx-auto'/>
                <p className='text-xl text-center mt-7 whitespace-nowrap'>در حال حاضر تراکنشی انجام نشده است !</p>
                      </div>
                : null}
                <ul className='mt-10'>
                    {props.loading 
                    ?<>
                        <li className='mb-5'><TransactionShimmer /></li>
                        <li className='mb-5'><TransactionShimmer /></li>
                        <li className='mb-5'><TransactionShimmer /></li>
                        <li className='mb-5'><TransactionShimmer /></li>
                        <li className='mb-5'><TransactionShimmer /></li>
                        <li className='mb-5'><TransactionShimmer /></li>
                    </>
                    :null}
                {props?.walletTransactions.map(transaction=>(
                    <li className='flex flex-row items-center pb-5 border-b border-border-gray mb-5' key={transaction.id}>
                        <span className='w-24 h-24 bg-primary flex items-center justify-center rounded'>
                        {transaction.type === '0' ? <DecreaseIcon /> : <IncreaseIcon /> }
                        </span>
                        <div className=' flex flex-col justify-between flex-1 h-24'>
                            <div className='flex flex-row items-center justify-between pr-3'>
                                <p className='text-md text-secondary font-medium'>مبلغ : </p>
                                <p className='flex flex-row items-center text-3xl font-medium'>
                                   {`${addCommas(+transaction.payment)}${transaction.type === '0' ?'-':'+'}`}
                                    <span className='text-md text-secondary mr-2 font-medium'>تومان</span>
                                </p>
                            </div>
                            <div className='flex flex-row items-center justify-between pr-3'>
                                <p className='text-md text-secondary font-medium'>تاریخ : </p>
                                <p className='text-md text-secondary mr-2 font-medium'>
                                    {convertToJalaliDate(transaction.created_at)}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
                </ul>
            </div>
        </section>
    );
};


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        wallet: state.user.wallet,
        walletTransactions: state.user.walletTransactions,
        loading: state.user.walletLoading,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onFetchWallet: (token) => dispatch(actions.fetchWallet(token)),
    }
  }

export default connect( mapStateToProps, mapDispatchToProps )(Wallet);