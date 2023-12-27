import React from 'react';
import {ReactComponent as CheckIcon} from '../../assets/svgs/checkSmGreenIcon.svg'
import ButtonPrimary from '../Ui/Button/ButtonPrimary';
import { useForm } from "react-hook-form";
import SnackBar from '../Ui/SnackBar/SnackBar';
import classes from '../../pages/Filter/filter.module.scss'
import classNames from 'classnames';
const SortFilterSnackBar = (props) => {

    const {
        handleSubmit,
        register,
        formState: { errors },
        getValues
      } = useForm();

      const handleSetBtnClick = ()=>{
        props.onSetBtnClick(getValues().sort);
    }
    return (
        <SnackBar open={props.open} onBackDropClick={props.onBackDropClick}>
        <h6 className='text-primary text-3xl font-semibold mb-10'>مرتب سازی</h6>

                <div className={classNames(classes.CustomRadio,'mb-6')} >
                <input type="radio" id={11} defaultChecked={true} value='min' {...register('sort')} className='hidden' />
                 <label htmlFor={11} className='flex flex-row items-center text-4xl font-yekan-medium'>
                     <span className='flex-10'><CheckIcon /></span>
                     &#8595;
                     ارزان ترین
                </label>
            </div>

            <div className={classNames(classes.CustomRadio,'mb-5')} >
                <input type="radio" id={12} value='max' {...register('sort')} className='hidden' />
                 <label htmlFor={12} className='flex flex-row items-center text-4xl font-yekan-medium'>
                     <span className='flex-10'><CheckIcon /></span>
                     &#8593;
                     گران ترین
                </label>
            </div>

            <div className={classNames(classes.CustomRadio,'mb-5')} >
                <input type="radio" id={14} value='favorite' {...register('sort')} className='hidden' />
                 <label htmlFor={14} className='flex flex-row items-center text-4xl font-yekan-medium'>
                     <span className='flex-10 -ml-2'><CheckIcon /></span>
                     &#9734;
                     محبوب ترین
                </label>
            </div>
             <ButtonPrimary type='button' onClick={handleSetBtnClick}>اعمال</ButtonPrimary>
        </SnackBar>
    );
};

export default SortFilterSnackBar;