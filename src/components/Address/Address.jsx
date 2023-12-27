import React, { useState } from 'react';
import classNames from 'classnames';
import classes from './Address.module.scss'
import { NavLink } from 'react-router-dom';
import {ReactComponent as EditIcon } from '../../assets/svgs/accountEditIcon.svg'
import {ReactComponent as RecycleBinIcon } from '../../assets/svgs/recyclebinIcon.svg'
const Address = (props) => {
    const [editStatus,setEditStatus] = useState(false);

    const handleOptionClick = ()=>{
        setEditStatus(prev => !prev);
    }

    const handleDeleteBtn = ()=>{
        props.onDeleteBtnClick(props.address.id);
    }
    return (
        <div className='shadow-accordion p-6'>
        <div className='flex flex-row'>
            <div className={classNames(classes.CustomRadio,'self-center')} >
            <input type="radio" id={props.address.id} name="address" checked={+props.selectedAddress === props.address.id} className='hidden' onChange={()=>props.onChange(props.address.id)}/>
                 <label htmlFor={props.address.id} className='w-9 h-9 flex rounded-full items-center justify-center border-2 border-border-gray'>
                    <span className='w-5 h-5 rounded-full'></span>
                </label>
            </div>
            <div className='px-5 flex-1'>
                <p className='text-lg font-semibold mb-5'>{`${props.address.city} - ${props.address.street}`}</p>
                <p className='text-md font-medium text-secondary'>{props.address.address}</p>
            </div>
            <div className={classNames(classes.CustomOption,'w-2 h-2 bg-primary rounded-full relative mt-3')} onClick={handleOptionClick}></div>
        </div>

        {editStatus 
        ?<div className='flex flex-row items-start border-t border-border-gray mt-6 pt-6'>
            <NavLink to={`/editaddress/${props.address.id}`} className='flex flex-row items-center justify-center text-xl border-l border-border-gray flex-1'>
                <EditIcon className='ml-3'/>
                ویرایش آدرس
            </NavLink>

            <button type='button' onClick={handleDeleteBtn} className='flex flex-row items-center justify-center text-xl text-red-primary flex-1'>
                <RecycleBinIcon className='ml-3'/>
                حذف آدرس
            </button>
        </div> : null}

       
        </div>
    );
};

export default Address;