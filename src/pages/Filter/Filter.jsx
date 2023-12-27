import React, { useState } from 'react';
import Toolbar from '../../components/Ui/Toolbar/Toolbar';
import {ReactComponent as RemoveIcon} from '../../assets/svgs/removeEditIcon.svg'
import {ReactComponent as CheckIcon} from '../../assets/svgs/checkSmGreenIcon.svg'
import classes from './filter.module.scss';
import classNames from 'classnames';
import Slider from 'rc-slider';
import { addCommas } from '../../shared/utility';
import ButtonPrimary from '../../components/Ui/Button/ButtonPrimary';
import ButtonSecondary from '../../components/Ui/Button/ButtonSecondary';
import { useForm } from "react-hook-form";

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

const { Range } = Slider;

const Filter = (props) => {
    const [urlQueries,setUrlQueries] = useState(new URLSearchParams(props.location.search));
    const [priceRange,setPriceRange] = useState([props.min_price,props.max_price]);
    const {
        handleSubmit,
        register,
        formState: { errors }
      } = useForm({defaultValues: {sort: props.sort}});

    const handleBackIconClick = ()=>{
        props.history.goBack();
    }

    const handleChangePriceRange = (price)=>{
        setPriceRange(price);
    }

    const handleSubmitForm = (data)=>{
        const [fromPrice,toPrice] = [...priceRange];
        props.onSetFilter(urlQueries.get('page'),'',data.sort,fromPrice,toPrice);
        props.history.goBack();
    }

    const handleRemoveFilterBtnClick = ()=>{
        props.onSetFilter('','','favorite',0,200000);
        props.history.goBack();
    }

    return (
        <section className='min-h-screen bg-white relative'>
            <Toolbar startIcon={<RemoveIcon onClick={handleBackIconClick} />} >فیلتر ها</Toolbar>
            <form className='px-6 pt-10' onSubmit={handleSubmit(handleSubmitForm)}>
                <h6 className='text-primary text-3xl font-semibold mb-10'>مرتب سازی</h6>

                <div className={classNames(classes.CustomRadio,'mb-6')} >
                <input type="radio" id={11} defaultChecked={props.sort === 'min'} value='min' {...register('sort')} className='hidden' />
                 <label htmlFor={11} className='flex flex-row items-center text-4xl font-yekan-medium'>
                     <span className='flex-10'><CheckIcon /></span>
                     &#8595;
                     ارزان ترین
                </label>
            </div>

            <div className={classNames(classes.CustomRadio,'mb-5')} >
                <input type="radio" id={12} value='max' defaultChecked={props.sort === 'max'} {...register('sort')} className='hidden' />
                 <label htmlFor={12} className='flex flex-row items-center text-4xl font-yekan-medium'>
                     <span className='flex-10'><CheckIcon /></span>
                     &#8593;
                     گران ترین
                </label>
            </div>

            <div className={classNames(classes.CustomRadio,'')} >
                <input type="radio" id={14} value='favorite' defaultChecked={props.sort === 'favorite'} {...register('sort')} className='hidden' />
                 <label htmlFor={14} className='flex flex-row items-center text-4xl font-yekan-medium'>
                     <span className='flex-10 -ml-2'><CheckIcon /></span>
                     &#9734;
                     محبوب ترین
                </label>
            </div>


            <h6 className='text-primary text-3xl font-semibold my-10'>محدوده قیمت</h6>

            <div className='flex flex-row items-center justify-between text-3xl'>
                <div className='flex-1 flex flex-row items-center justify-between border border-border-gray p-3 ml-4'>
                    <p>از</p>
                    <p>{addCommas(priceRange[0])}</p>
                </div>
                <div className='flex-1 flex flex-row items-center justify-between border border-border-gray p-3'>
                    <p>تا</p>
                    <p>{addCommas(priceRange[1])}</p>
                </div>
            </div>

            <Range className='my-16'
            handleStyle={[{backgroundColor: 'white',borderColor: 'black',borderWidth: '.3rem',outlineColor: 'black',boxShadow: 'none'},
            {backgroundColor: 'white',borderColor: 'black',borderWidth: '.3rem',boxShadow: 'none'}]}
            trackStyle={[{backgroundColor: 'black',height: '.5rem'}]} reverse
             min={0} max={200000} onChange={handleChangePriceRange} defaultValue={[0, 200000]} tipFormatter={value => `${value}%`}   />


            {/* <h6 className='text-primary text-3xl font-semibold my-10'>وضعیت کالا</h6> */}

            {/* <div className='ma-checkbox mt-5 mr-10'>
                            <input type="checkbox" id="wrong-send-checkbox" className='hidden'/>
                              <label htmlFor="wrong-send-checkbox" className='flex flex-row items-center text-3xl'>
                                 کالا های موجود
                            </label>
                          </div> */}

                    <div className='flex flex-row items-center justify-between fixed right-0 bottom-0 left-0 p-6'>
                    <ButtonPrimary type='sumbit'>ذخیره</ButtonPrimary>
                    {props.page === urlQueries.get('page') 
                    ? <ButtonSecondary type='button' onClick={handleRemoveFilterBtnClick} className='border-red-primary text-red-primary mr-5'>حذف فیلتر</ButtonSecondary>
                    : null}
                </div>

            </form>
        </section>
    );
};


const mapStateToProps = state => {
    return {
        page: state.search.page,
        search: state.search.search,
        sort: state.search.sort,
        max_price: state.search.max_price,
        min_price: state.search.min_price,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onSetFilter: (page,search,sort,minPrice,maxPrice) => dispatch(actions.setFilter(page,search,sort,minPrice,maxPrice)),
    }
  }


export default connect( mapStateToProps, mapDispatchToProps )(Filter);