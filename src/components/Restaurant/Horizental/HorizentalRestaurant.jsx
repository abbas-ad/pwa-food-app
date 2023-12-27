import React from 'react';
import {ReactComponent as MinusIcon} from '../../../assets/svgs/minusIcon.svg'
import {ReactComponent as PlusIcon} from '../../../assets/svgs/plusIcon.svg'
import {ReactComponent as HeartBorderWhiteIcon} from '../../../assets/svgs/heartWhiteBorderIcon.svg'
import {ReactComponent as HeartWhiteIcon} from '../../../assets/svgs/heartWhiteIcon.svg'
import _ from 'lodash';
import {addCommas} from '../../../shared/utility'
import {ReactComponent as StarIcon} from '../../../assets/svgs/starIcon.svg'
import classes from '../../Menu/Menu.module.scss'
import MenuImg from '../../../assets/img/menuItem.png'
const HorizentalRestaurant = (props) => {

    const handleRestaurantClick = ()=>{
        props.history.push('/restaurants/'+props.restaurant.slug)
    }

    const handleChangeSelect = (v)=>{
        props.onChangSelect(v.target.checked);
    }

    const handleCheckBoxClick = (e)=>{
        e.stopPropagation();
    }
    return (
        <div className='p-3 shadow-accordion mt-5 flex flex-row bg-white' onClick={handleRestaurantClick}>
        <figure className='w-40 relative'>
            {/* <div className='absolute flex flex-row items-center'>
            {props.new ? <span className='bg-primary text-base text-white px-2 py-1'>جدید</span> : null }
            {props.off ? <span className='bg-red-primary text-base text-white px-2 py-1'>21%</span> : null }

            </div> */}
            {/* {props.quantity ? null 
            : <p className='absolute flex items-center justify-center text-xl bg-primary w-full h-full bg-opacity-50 text-white'>ناموجود</p>} */}

            <img className='w-full h-full' src={props.restaurant.image} alt='restaurant logo' />
            {!props.favorite ?<span className='absolute left-2 bottom-2 '><HeartBorderWhiteIcon  className='w-7 h-6'/></span> : null }

        </figure>
            <div className='flex-1 px-4'>
                <h6 className='text-xl font-bold mb-3'>{props.restaurant.name}</h6>
                <p className='text-base text-gray-primary mb-5'>{_.truncate(props.restaurant.description,{length: 40})}</p>
                <p className='text-base text-gray-primary mb-2'>{props.restaurant.delivery_time} دقیقه</p>

                <div className='flex flex-row items-center mb-2'>
                    <p className='flex flex-row items-center text-lg font-semibold text-secondary'>
                            <span><StarIcon className='ml-2' /></span>
                            {props.restaurant.rating}
                        </p>
                        <p className='flex-1 text-md text-secondary mr-3'>{addCommas(props.restaurant.comment_count)} نظر</p>

                        {props.select
                        ?<>
                        <input type="checkbox"id={`slecet-checkbox-${props.restaurant.id}`} onChange={handleChangeSelect} onClick={handleCheckBoxClick} className={classes.CustomSelect}/>
                        <label htmlFor={`slecet-checkbox-${props.restaurant.id}`} className='shadow-accordion' onClick={handleCheckBoxClick}></label>
                        </> : null }
                    {/* <p className='text-3xl text-black flex flex-row items-center'>
                        <span className='w-12 h-12 flex items-center justify-center bg-primary ml-3 rounded-md'><PlusIcon /></span>
                            2
                        <span className='w-12 h-12 flex items-center justify-center mr-3 rounded-md border-2'><MinusIcon /></span>
                    </p> */}
                </div>
            </div>
    </div>
    );
};

export default HorizentalRestaurant;