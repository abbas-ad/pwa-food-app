import React from 'react';
import classNames from 'classnames';
import classes from './Input.module.scss'
const InputSecondary = (props) => {
    return (
        <div className={classNames(props.className,classes.Secondary,'relative h-20')}>
            <input type={props.type} id={props.placeholder} placeholder={props.placeholder} {...props.register(props.name,{...props.validation})}
             className={classNames('pr-8 w-full h-full text-xl font-medium outline-none border'
             ,props.errors[props.name] ? 'border-red-primary focus:border-red-primary' : 'border-gray-primary focus:border-primary')}/>

            <label htmlFor={props.placeholder} className={classNames('mr-5 px-3 -top-5 bg-white text-lg font-medium absolute right-0 transition-all duration-300'
            ,props.errors[props.name] ? 'text-red-primary' : 'text-primary')}>{props.placeholder}</label>

        </div>
    );
};

export default InputSecondary;