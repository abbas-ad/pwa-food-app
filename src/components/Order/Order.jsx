import React from 'react';
import {ReactComponent as ArrowLeftIcon} from '../../assets/svgs/orderStep/arrowLeftIcon.svg'
import {ReactComponent as PaymentActiveIcon} from '../../assets/svgs/orderStep/paymentActiveIcon.svg'
// import {ReactComponent as PaymentIcon} from '../../assets/svgs/orderStep/paymentIcon.svg'
import {ReactComponent as AcceptedActiveIcon} from '../../assets/svgs/orderStep/acceptedActiveIcon.svg'
import {ReactComponent as AcceptedIcon} from '../../assets/svgs/orderStep/acceptedIcon.svg'
import {ReactComponent as SendActiveIcon} from '../../assets/svgs/orderStep/sendActiveIcon.svg'
import {ReactComponent as SendIcon} from '../../assets/svgs/orderStep/sendIcon.svg'
import {ReactComponent as CompleteActiveIcon} from '../../assets/svgs/orderStep/completeActiveIcon.svg'
import {ReactComponent as CompleteIcon} from '../../assets/svgs/orderStep/completeIcon.svg'
import MenuImg from '../../assets/img/menuItem.png'
import { NavLink,useHistory } from 'react-router-dom';


const formatDateOption = {  year: 'numeric', month: 'numeric', day: 'numeric' };
const formatTimeOption = {  hour: '2-digit', minute: '2-digit' };
const Order = (props) => {
    const history = useHistory();

    const handleAddComment = ()=>{
        history.push(`/restaurants/${props.order.restaurant_slug}/comments?order=${props.order.id}`)
    }

    const handleOrderCardClick = (e)=>{
        e.stopPropagation();
        history.push(+props.order.status === 1 ? `/cart` :`/order/${props.order.id}`)
    }
    return (
        <div className='bg-white px-6 shadow py-5' onClick={handleOrderCardClick}>
            <div className='flex flex-row items-center justify-between text-md text-secondary font-medium'>
                <p >تاریخ ثبت سفارش : </p>
                <p className=''>{` ${new Date(props.order.created_at).toLocaleString('fa-IR',formatTimeOption)} - ${new Date(props.order.created_at).toLocaleString('fa-IR',formatDateOption)}`}</p>
            </div>

            {+props.order.status >= 4 ?<div className='flex flex-row items-center justify-between text-lg text-green-primary mt-5 font-semibold'>
                <p >کد پیگیری : </p>
                <p>{props.order.id}</p>
            </div> :null}

            <h6 className='text-center font-bold text-4xl mt-10'>{props.order.orderRestaurant.name}</h6>
            <p className='text-lg text-center text-secondary mt-3'>{props.order.orderRestaurant.address}</p>

            <div className='flex flex-row items-center mt-10'>
            <p className='flex-1 text-base text-secondary whitespace-nowrap flex flex-col items-center'>
                     <PaymentActiveIcon className='mb-3' />
                    درانتظار پرداخت
                </p>
                <span className='flex-1 flex items-center justify-center mb-8'><ArrowLeftIcon/></span>
                <p className='flex-1 text-base text-secondary whitespace-nowrap flex flex-col items-center'>
                {+props.order.status >= 4 ?<AcceptedActiveIcon className='mb-3'/>:<AcceptedIcon className='mb-3'/>}
                    تایید شده
                </p>
                <span className='flex-1 flex items-center justify-center mb-8'><ArrowLeftIcon/></span>
                <p className='flex-1 text-base text-secondary whitespace-nowrap flex flex-col items-center'>
                {+props.order.status >= 5 ?<SendActiveIcon className='mb-3'/>:<SendIcon className='mb-3'/>}
                    ارسال شده
                </p>
                <span className='flex-1 flex items-center justify-center mb-8'><ArrowLeftIcon/></span>

                <p className='flex-1 text-base text-secondary whitespace-nowrap flex flex-col items-center'>
                {+props.order.status >= 6 ?<CompleteActiveIcon className='mb-3'/>:<CompleteIcon className='mb-3'/>}
                    تکمیل شده
                </p>
            </div>

            <div className='flex flex-row items-center mt-10'>
                <ul className='flex flex-row items-center'>
                    {props.order.orderItems.slice(0,3).map(item=>(
                        <li className='ml-2'>
                        <figure className='w-20 h-20'><img className='w-full h-full' src={item.item.image} alt="menu1" /></figure>
                    </li>
                    ))}
                </ul>

                {props.order.orderItems.length > 3 ? <p className='flex-1 text-3xl font-medium mr-3'>{props.order.orderItems.length - 3} +</p> : null}

                <NavLink to={+props.order.status  === 1 ? `/cart` :`/order/${props.order.id}`} className='flex flex-row text-xl text-secondary items-center font-medium flex-1 justify-end'>
                        جزییات
                        <span className='mr-3'><ArrowLeftIcon className='fill-current'/></span>
                    </NavLink>


            </div>


            {+props.order.status <= 3 ? <button type='button' onClick={props.onCancelBtnClick} className='mt-10 h-20 w-full border border-red-primary rounded-lg text-xl font-yekan-medium text-red-primary'>لغو سفارش</button> : null}
            {+props.order.status > 3 && +props.order.status <= 5 ? <button  type='submit' onClick={props.onFollowUpBtnClick} className='mt-10 h-20 w-full border border-primary rounded-lg text-xl font-yekan-medium text-primary'>پیگیری سفارش</button> : null }
            {+props.order.status === 6 ? <button type='button' onClick={handleAddComment} className='mt-10 h-20 w-full border border-primary rounded-lg text-xl font-yekan-medium text-primary'>افزودن نظر</button> : null }
        </div>
    );
};

export default Order;