import React from 'react';

const Toolbar = (props) => {
    return (
        <div className='flex flex-row items-center h-20 shadow-accordion px-6 bg-white'>
            <span className='flex-20'>{props.startIcon}</span>
            <p className='flex-1 text-center text-4xl'>{props.children}</p>
            <span className='flex-20 flex justify-end' onClick={props.endIconClick}>{props.endIcon}</span>
        </div>
    );
};

export default Toolbar;