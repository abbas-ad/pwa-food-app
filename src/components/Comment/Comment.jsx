import React from 'react';
import {ReactComponent as StartWhiteIcon} from '../../assets/svgs/startWhite.svg'
import {ReactComponent as ArrowUpIcon} from '../../assets/svgs/arrowUp.svg'

import classNames from 'classnames';
import classes from './Comment.module.scss'
import { NavLink } from 'react-router-dom';
const Comment = (props) => {
    return (
        <div className='px-6 pb-10 border-b border-gray-secondary'>
            <div className='flex flex-row items-center border-b border-gray-secondary pb-3'>
                <p className='text-3xl text-gray-primary border-l border-gray-secondary pl-3'>{`${props.comment.first_name} ${props.comment.last_name}`}</p>
                <p className='flex-1 text-gray-primary pr-3 text-lg'>{props.comment.jalali_created_at}</p>
                <span className='flex flex-row items-center bg-primary py-1 px-2 text-white text-lg'>
                    <StartWhiteIcon className='ml-1' />
                    {props.comment.rate}
                </span>

            </div>
            {props.comment.items.length > 1
            ? <div className='mt-6'>
            <input type='checkbox' className={classes.Input} id={`accordion-comment${props.comment.id}`} />
            <label className='flex flex-row items-center text-xl' htmlFor={`accordion-comment${props.comment.id}`}>
            <span className='flex-1 text-xl text-green-primary'>سفارشات ({props.comment.items.length})</span>
            <span ><ArrowUpIcon className='text-green-primary fill-current'/></span>
            </label>
                <div className={'mt-5 max-h-0 overflow-hidden transition-all duration-500 ease-in-out'}>
                <ul>
                    {props.comment.items.map(item=>(
                        <li className={classNames('flex flex-row items-center mb-5',classes.Dot)}>
                    <p className={classNames("flex-1 text-lg text-green-primary")}>{item.name}</p>
                    <NavLink to={`/restaurants/${props.restaurantSlug}?menu=${item.id}`} className='bg-green-primary text-white text-md font-semibold px-2'>مشاهده</NavLink>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
            : <div className={classNames('flex flex-row items-center my-6',classes.Dot)}>
            <p className={classNames("flex-1 text-lg text-green-primary")}>{props.comment.items[0].name}</p>
            <NavLink to={`/restaurants/${props.restaurantSlug}?menu=${props.comment.items[0].id}`} className='bg-green-primary text-white text-md font-semibold px-2'>مشاهده</NavLink>
            </div>
            }

           
            <p className='text-justify text-lg'>
                {props.comment.comment}
            </p>

        </div>
    );
};

export default Comment;