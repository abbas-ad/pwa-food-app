import React from 'react';
import {ReactComponent as OrderSuccessIcon} from '../../assets/svgs/payment/orderSuccessIcon.svg'
import {ReactComponent as ForwardIcon} from '../../assets/svgs/forwardIcon.svg'
import ButtonPrimary from '../../components/Ui/Button/ButtonPrimary';
import { NavLink } from 'react-router-dom';

const PaymentResult = () => {
    return (
        <section className='min-h-screen flex flex-col items-center justify-center'>
            <OrderSuccessIcon />
            <p className='text-xl py-7 font-semibold'>سفارش شما با موفقیت ثبت شد.</p>
            <p className='text-lg font-medium mb-7'>
                کد پیگیری:
                <span className='text-green-primary mr-10'>24672</span>
            </p>

            <NavLink to='/home' className='bg-primary flex flex-row items-center text-white text-xl py-3 px-4 rounded-md'>
                <ForwardIcon className='ml-4'/>
                رفتن به صفحه اصلی
            </NavLink>
        </section>
    );
};

export default PaymentResult;