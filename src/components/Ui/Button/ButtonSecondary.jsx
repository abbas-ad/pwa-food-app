import React from 'react';
import classNames from 'classnames';

const ButtonSecondary = (props) => {
    return (
        <button {...props} 
        className={classNames('border w-full text-xl font-medium h-20',props.className)} onClick={props.onClick}>
            {props.children}
            </button>
    );
};

export default ButtonSecondary;