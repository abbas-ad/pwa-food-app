import React from 'react';
import classNames from 'classnames';
const ButtonPrimary = (props) => {
    return (
        <button {...props}
        className={classNames('bg-primary w-full text-white text-xl font-medium h-20',props.className)}>
            {props.children}
            </button>
    );
};

export default ButtonPrimary;