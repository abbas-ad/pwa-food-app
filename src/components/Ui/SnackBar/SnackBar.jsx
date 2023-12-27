import React from 'react';
import classNames from 'classnames';

const SnackBar = (props) => {
    return (
        <>
            <div className={classNames('absolute right-0 bottom-0 top-0 left-0 bg-primary transition-opacity duration-700 z-50',props.open ? 'opacity-40 max-h-full' : 'max-h-0 w-0 opacity-0')} onClick={props.onBackDropClick}></div>
            <div className={classNames(props.className,'z-50 fixed bottom-0 right-0 left-0 max-h-middle rounded-t-3xl bg-white p-6 transform transition-transform duration-500',props.open ? 'translate-y-0' : 'translate-y-full')}>
                {props.children}
            </div>
        </>
    );
};

export default SnackBar;