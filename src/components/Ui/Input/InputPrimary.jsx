import React from 'react';
import classNames from 'classnames';
const InputPrimary = (props) => {
    return (
        <div className={classNames(props.className)}>
            <label className={classNames('block text-xl font-medium text-secondary',props.labelclassName)} htmlFor={props.label}>{props.label}</label>
            <input type={props.type} placeholder={props.placeholder} disabled={props.disabled}  {...props.register(props.name,{...props.validation})}
            className={classNames('w-full bg-gray-secondary  text-lg font-medium h-20  px-3 mt-5',props.errors[props.name] ? 'border border-red-primary focus:outline-red-primary' : 'focus:outline-black')} id={props.label} />
        </div>
    );
};

export default InputPrimary;