import React, { useState } from 'react';
import SnackBar from '../SnackBar/SnackBar';
import {ReactComponent as ArrowDown} from '../../../assets/svgs/arrowDownIcon.svg'
import ButtonPrimary from '../Button/ButtonPrimary';
import classNames from 'classnames';

const Select = (props) => {
    const [snackBarOpen,setSnackBarOpen] = useState(false);
    const [value,setValue] = useState(props.value ? {...props.value} : {id: '', name: props.placeholder});
    const handleInputClick = ()=>{
        setSnackBarOpen(prev=>!prev);
    }

    const handleBackDropClick = ()=>{
        setSnackBarOpen(prev=>!prev);
    }

    const handleItemClick = (id)=>{
        if(id !== 0) props.onChange(id);
        setValue({id: id,name: props.data.find(d=> d.id === id)[props.name] || props.placeholder})
        setSnackBarOpen(prev=>!prev);
    }


    return (
        <div className={props.className}>
            <div className={classNames('flex flex-row items-center bg-gray-secondary h-20 px-6',props.errors[props.name] ? 'border border-red-primary':'border-0')} onClick={handleInputClick}>
                <input type="text" value={value.name} disabled className='flex-1 h-full text-xl'/>
                <input type="hidden" className='' {...props.register(props.name,{...props.validation,value: value.id})} />
                <ArrowDown />
            </div>
            <SnackBar open={snackBarOpen} onBackDropClick={handleBackDropClick} className='overflow-y-auto'>
                <ul className='text-center text-xl'>
                    <li className='py-3' onClick={()=>handleItemClick('')} key={0}>هیچکدام</li>
                    {props.data.map(d=>(
                        <li key={d.id} className='py-3' onClick={()=>handleItemClick(d.id)}>{d[props.name]}</li>
                    ))}
                </ul>
            </SnackBar>
        </div>
    );
};

export default Select;