import React,{useState} from 'react';
import Toolbar from '../../../components/Ui/Toolbar/Toolbar';
import {ReactComponent as BackIcon} from '../../../assets/svgs/backIcon.svg'
import {ReactComponent as RemoveIcon} from '../../../assets/svgs/removeAmountIcon.svg'
import ButtonPrimary from '../../../components/Ui/Button/ButtonPrimary';
import {useForm} from 'react-hook-form'
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import Loading from '../../../components/Loading/Loading';
import classNames from 'classnames';

const IncreaseWallet = (props) => {
    const {
        handleSubmit,
        register,
        formState: { errors }
      } = useForm();
    const [balance,setBalance] = useState('');

    const handleChangeBalance = (value)=>{
        const amount = value.target.value.replaceAll(',','');
        setBalance(amount.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
    }

    const handleFormSubmit = (data) =>{
        props.onChangeWallet(props.token,data.amount,'1');
        props.history.goBack();
    }

    const handleBackClick = ()=>{
        props.history.goBack();
    }
    const handleIncreaseBalance = (amount)=>{
        const newBalance = +balance.replaceAll(',','')+amount+'';
        setBalance(newBalance.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
    }

    return (
        <section className='h-screen bg-white relative'>
            <Toolbar startIcon={<BackIcon onClick={handleBackClick}/>}>افزایش موجودی</Toolbar>
            <div className='px-6'>
            <h5 className='text-center text-3xl font-medium mt-10'>مبلغ مورد نظر خود را وارد کنید : </h5>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classNames('flex flex-row items-center mt-8 border p-5',errors.amount ? 'border-red-primary' : 'border-border-gray')}>
                    <p className='text-lg text-gray-primary'>مبلغ(تومان) : </p>
                    <input type="hidden" className='' 
                    {...register('amount',{required: true,value: balance.replaceAll(',','')})} />
                    <input type="tel" className='flex-1 text-3xl ml-3 text-center font-yekan-medium outline-none'
                    onChange={handleChangeBalance} value={balance}
                     placeholder='مبلغ را وارد کنید'/>
                    <RemoveIcon className='mx-3' onClick={()=>setBalance('')}/>
                    <div className='fixed bottom-6 left-0 right-0 px-6'>
                    {props.loading ? <Loading />  : <ButtonPrimary type='submit'>پرداخت</ButtonPrimary> }
                    </div>
                </div>
              </form>

                <ul className='flex flex-row items-center justify-between mt-8'>
                    <li className='flex-1 border border-border-gray text-center text-3xl py-3' onClick={()=>handleIncreaseBalance(20000)}>
                        20,000
                    </li>

                    <li className='flex-1 border border-border-gray mx-5 text-center text-3xl py-3' onClick={()=>handleIncreaseBalance(50000)}>
                        50,000
                    </li>
                    <li className='flex-1 border border-border-gray  text-center text-3xl py-3' onClick={()=>handleIncreaseBalance(100000)}>
                        100,000
                    </li>
                </ul>
                </div>

                
        </section>
    );
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        walletChangeStatus: state.user.walletChangeStatus,
        loading: state.user.walletChangeLoading,
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
        onChangeWallet: (token,balance,type) => dispatch(actions.changeWallet(token,balance,type)),
    }
  }

export default connect( mapStateToProps, mapDispatchToProps )(IncreaseWallet);