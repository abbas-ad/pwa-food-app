import React from 'react';
import MenuImg from '../../../assets/img/menuItem.png'
import {ReactComponent as HeartBorderWhiteIcon} from '../../../assets/svgs/heartWhiteBorderIcon.svg'
import {ReactComponent as HeartWhiteIcon} from '../../../assets/svgs/heartWhiteIcon.svg'

import {ReactComponent as MarketCategoryIcon} from '../../../assets/svgs/marketCategoryIcon.svg'
import {ReactComponent as MinusIcon} from '../../../assets/svgs/minusIcon.svg'
import {ReactComponent as PlusIcon} from '../../../assets/svgs/plusIcon.svg'
import { useHistory } from "react-router-dom";
import { addCommas } from '../../../shared/utility';
import Loading from '../../../components/Loading/Loading';
import {ReactComponent as RecycleBinIcon} from '../../../assets/svgs/recycleBinGrayIcon.svg'

const VerticalProduct = (props) => {
    const history = useHistory();

    const handleAddToCartClick = (e)=>{
        e.stopPropagation();
        props.handleAddToCartBtnClick(0,props.product.id);
    }
    const handleRemoveFromCartClick=(e)=>{
        e.stopPropagation();
        props.handleRemoveFromCartBtnClick(props.product.id);
    }

    const handleFavoriteClick = (e)=>{
        e.stopPropagation();
        props.onFavoriteClick(props.product.id)
    }

    const handleChangeSelect = (v)=>{
        props.onChangSelect(v.target.checked);
    }
    const handleProductClick = ()=>{
        history.push('/product/'+props.product.id);
    }
    return (
        <div className='w-96 p-5 shadow-accordion' onClick={handleProductClick}>
            <figure className='w-full h-72 relative'>
                <div className='absolute flex flex-row items-center'>
                {props.product.is_new === '1' ? <span className='bg-primary text-base text-white px-2 py-1'>جدید</span> : null }
                {props.product.is_off === '1' ? <span className='bg-red-primary text-base text-white px-2 py-1'>{props.product.off_percentage}%</span> : null }

                </div>
                {props.product.status === '1' ? null 
                : <p className='absolute flex items-center justify-center text-xl bg-primary w-full h-full bg-opacity-50 text-white'>ناموجود</p>}

                <img className='w-full h-full' src={props.product.image} alt='restaurant logo' />
                <span className='absolute left-2 bottom-2 ' onClick={handleFavoriteClick}>
                {props.favorites.find(f=> +f.item_id === +props.product.id) 
                ?<HeartWhiteIcon  className='w-9 h-8'/>
                : <HeartBorderWhiteIcon  className='w-9 h-8'/>}</span>
            </figure>

            <h6 className='text-xl font-bold my-3'>{props.product.name}</h6>
            <p className='text-base text-gray-primary mb-5'>توضیحات اضافی این محصول .....</p>
            <p className='flex flex-row items-center text-green-primary text-md font-semibold'>
                <MarketCategoryIcon className='ml-2'/>
                {props.product.category}
            </p>

            <div className='flex flex-row justify-between'>
            <div className='mt-4'>
            {props.product.is_off === '1' ? <p className='text-md text-secondary'><strike>{addCommas(props.product.sell_price)}</strike></p> : null }
                        <p className='text-4xl font-bold'>
                        {addCommas(props.product.is_off === '1' ? props.product.off_sell_price : props.product.sell_price)}

                            <span className='text-base pr-1'>تومان</span>
                        </p>
            </div>
            {props.product.status === '1' && !props.select && !props.favorite ? <div className='text-3xl text-black flex flex-row items-center'>
                            {props.loading
                            ?<Loading className='w-8 h-8'/>
                            :<>
                            <button type='button' onClick={handleAddToCartClick} className='w-12 h-12 flex items-center justify-center bg-primary ml-4 rounded-md'><PlusIcon className='text-white stroke-current' /></button>
                                {props.cart.find(c=> c.item_id === `${props.product.id}`)?.count || 0}
                            <button type='button' onClick={handleRemoveFromCartClick} className='w-12 h-12 flex items-center justify-center mr-4 rounded-md border-2'>
                                {props.cart.find(c=> c.item_id === `${props.product.id}`)?.count == 1
                                ? <RecycleBinIcon />
                                :<MinusIcon />}
                                
                                </button>
                            </>}
                        </div> : null }
            </div>

        </div>
    );
};

export default VerticalProduct;