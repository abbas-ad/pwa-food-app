import React, { useState } from 'react';
import RestaurantImg from '../../assets/img/restaurant.png'
import {ReactComponent as StarIcon} from '../../assets/svgs/starIcon.svg'
import {ReactComponent as HeartWhiteIcon} from '../../assets/svgs/heartWhiteIcon.svg'
import {ReactComponent as HeartBorderIcon} from '../../assets/svgs/heartWhiteBorderIcon.svg'
import _ from 'lodash';

import classNames from 'classnames';
import classes from './Restaurant.module.scss'
const Restaurant = (props) => {
    const [isFavorite,setIsFavorite] = useState(false);
    const handleRestaurantClick = ()=>{
        props.history.push('/restaurants/'+props.restaurant.slug)
    }

     const handleFavoriteClick = (e)=>{
         e.stopPropagation();
         props.onFavoriteClick(props.restaurant.slug)
     }
    return (
        <div className='bg-white p-4' onClick={handleRestaurantClick}>
            <figure className='h-72 w-full relative'>
                <div className='absolute left-8 top-10' ><span className={classNames(classes.Heart)}></span></div>
                {props.favorites.find(f=> f.restaurant_slug === props.restaurant.slug) ? <HeartWhiteIcon className={classNames('absolute left-6 top-8 text-white stroke-current')} onClick={handleFavoriteClick} /> 
                :<HeartBorderIcon className={classNames('absolute left-6 top-8 text-white stroke-current')} onClick={handleFavoriteClick} />}
                <img src={props.restaurant.image} className='w-full h-full' alt="restaurant" />
                </figure>

            <h5 className='text-xl mt-4 font-yekan-bold'>{props.restaurant.name}</h5>
            <h6 className='text-lg mt-3 font-yekan-medium'>{_.truncate(props.restaurant.description,{length: 40})}</h6>
            
            <div className='flex flex-row items-center mt-3'>
                <p className='text-md font-yekan ml-5'>{props.restaurant.delivery_time} دقیقه</p>
                <p className='flex flex-row items-center text-md'>
                    <StarIcon  className='ml-2'/>
                    {props.restaurant.rating}
                    <span className='mr-2 text-gray-primary'>({props.restaurant.comment_count}+)</span>
                </p>
            </div>
        </div>
    );
};



export default Restaurant;