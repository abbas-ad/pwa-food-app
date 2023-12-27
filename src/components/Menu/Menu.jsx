import React from 'react';
import {ReactComponent as MinusIcon} from '../../assets/svgs/minusIcon.svg'
import {ReactComponent as PlusIcon} from '../../assets/svgs/plusIcon.svg'
import {ReactComponent as HeartBorderWhiteIcon} from '../../assets/svgs/heartWhiteBorderIcon.svg'
import {ReactComponent as HeartWhiteIcon} from '../../assets/svgs/heartWhiteIcon.svg'
import {ReactComponent as StarIcon} from '../../assets/svgs/starIcon.svg'
import {ReactComponent as ForkIcon} from '../../assets/svgs/forkIcon.svg'
import {ReactComponent as RecycleBinIcon} from '../../assets/svgs/recycleBinGrayIcon.svg'
import classes from './Menu.module.scss'
import { addCommas } from '../../shared/utility';
import Loading from '../Loading/Loading';
const Menu = (props) => {


    const handleAddToCartClick = ()=>{
        props.handleAddToCartBtnClick(props.menu.restaurant_slug,props.menu.id);
    }
    const handleRemoveFromCartClick=()=>{
        props.handleRemoveFromCartBtnClick(props.menu.id);
    }

    const handleFavoriteClick = (e)=>{
        e.stopPropagation();
        props.onFavoriteClick(props.menu.id)
    }

    const handleChangeSelect = (v)=>{
        props.onChangSelect(v.target.checked);
    }

    return (
        <div className='p-6 shadow-accordion mt-5 flex flex-row bg-white' ref={props.refMenu} key={'menu-'+props.menu.id} id={'menu-'+props.menu.id}>
            <figure className='w-40 h-40 relative'>
                <div className='absolute flex flex-row items-center'>
                {props.menu.is_new === '1' ? <span className='bg-primary text-base text-white px-2 py-1'>جدید</span> : null }
                {props.menu.is_off === '1' ? <span className='bg-red-primary text-base text-white px-2 py-1'>{props.menu.off_percentage}%</span> : null }

                </div>
                {props.menu.count === '0' ? <p className='absolute flex items-center justify-center text-xl bg-primary w-full h-full bg-opacity-50 text-white'>ناموجود</p>
                : null}

                <img className='w-full h-full' src={props.menu.image} alt='restaurant logo' />
                {!props.favorite ? 
                <span className='absolute left-2 bottom-2 ' onClick={handleFavoriteClick}>
                {props.favorites.find(f=> +f.item_id === +props.menu.id) 
                ? <HeartWhiteIcon  className='w-9 h-8' />
                : <HeartBorderWhiteIcon  className='w-9 h-8' /> }
                    </span>
                    : null}

            </figure>
                <div className='flex-1 flex flex-col px-3'>
                    <h6 className='text-lg font-bold mb-3'>{props.menu.name}</h6>
                    <p className='text-base flex-1 text-gray-primary mb-2'>توضیحات اضافی این محصول .....</p>
                    {props.restaurantInfo 
                    ?<div className='flex flex-row items-center'>
                        <p className='text-md text-green-primary flex flex-row items-center font-semibold'>
                            <span className='ml-2'><ForkIcon /></span>
                            {props.menu.restaurant_name}
                        </p>
                        <p className='flex flex-row items-center text-lg font-semibold text-secondary mr-5'>
                            <span><StarIcon className='ml-1' /></span>
                            {props.menu.restaurant_rating}
                        </p>
                        <p className='text-md text-secondary mr-5'>{addCommas(props.menu.vote_number)} نظر</p>
                    </div> : null }
                    <div className='flex flex-row items-center mt-4'>
                        {props.menu.is_off === '1' ? <p className='text-base text-secondary'><strike>{addCommas(props.menu.sell_price)}</strike></p> : null }
                        <p className='flex-1 text-3xl pr-3 font-bold'>
                        {addCommas(props.menu.is_off === '1' ? props.menu.off_sell_price :props.menu.sell_price)}
                            <span className='text-base pr-1'>تومان</span>
                        </p>
                        {props.menu.status === '1' && +props.menu.count > 0 && !props.select && !props.favorite ? <div className='text-3xl text-black flex flex-row items-center'>
                            {props.loading
                            ?<Loading className='w-8 h-8'/>
                            :<>
                            <button type='button' onClick={handleAddToCartClick} className='w-12 h-12 flex items-center justify-center bg-primary ml-4 rounded-md'><PlusIcon className='text-white stroke-current' /></button>
                                {props.cart.find(c=> c.item_id === `${props.menu.id}`)?.count || 0}
                            <button type='button' onClick={handleRemoveFromCartClick} className='w-12 h-12 flex items-center justify-center mr-4 rounded-md border-2'>
                                {props.cart.find(c=> c.item_id === `${props.menu.id}`)?.count == 1
                                ? <RecycleBinIcon />
                                :<MinusIcon />}
                                
                                </button>
                            </>}
                        </div> : null }
                        {props.select
                        ?<>
                        <input type="checkbox" id={`slecet-checkbox-${props.menu.id}`} onChange={handleChangeSelect} className={classes.CustomSelect}/>
                        <label htmlFor={`slecet-checkbox-${props.menu.id}`} className='shadow-accordion'></label>
                        </> : null }
                    </div>
                </div>
        </div>
    );
};


export default Menu;