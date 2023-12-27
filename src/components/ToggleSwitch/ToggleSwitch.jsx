import React from 'react';
import classNames from 'classnames';
import classes from './ToggleSwitch.module.scss'
const ToggleSwitch = (props) => {
    const handleToggleChange = (v)=>{
        props.onChange(v.target.checked);
    }

    return (
        <div>
            <input className={classNames('hidden',classes.Toggle)} defaultChecked={props.checked} type="checkbox" id='toggleswitch' onChange={handleToggleChange} />
            <label className='flex flex-row items-center overflow-hidden rounded-full bg-gray-secondary px-2 w-80 max-h-20 relative'  htmlFor="toggleswitch">
                <span className='w-1/2 absolute bg-primary h-4/5 rounded-full z-0'></span>
                <p className='text-xl text-center w-1/2 px-4 mr-1 py-5 z-10 text-white'>{props.firstStatusLabel}</p>
                <p className='text-xl text-center w-1/2 px-4 ml-1 py-5 z-10'>{props.secondStatusLabel}</p>
            </label>
        </div>
    );
};

export default ToggleSwitch;