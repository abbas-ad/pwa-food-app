import React, { useState } from 'react';
import {ReactComponent as ArrowUpIcon} from '../../../assets/svgs/arrowUp.svg'
import classNames from 'classnames';
import classes from './Accordion.module.scss'
const Accordion = (props) => {
    const [isOpen,setIsOpen] = useState(props.open);
    const handleChangeOpen = ()=>{
        setIsOpen(prev=>!prev);
    }
    return (
                <div className={props.className} id={props.id} ref={props.ref} key={props.id}> 
                    <input type='checkbox' className={classes.Input} id={`accordion-check-${props.index}`} checked={isOpen} onChange={handleChangeOpen}/>
                    <label className='flex flex-row items-center text-xl px-6' htmlFor={`accordion-check-${props.index}`}>
                    <span className='flex-1 text-4xl font-bold'>{props.title}</span>
                    <span><ArrowUpIcon/></span>
                    </label>
                <div className={'mt-5 overflow-hidden max-h-0 transition-all duration-500'}>{props.children}</div>
            </div>
    );
};

export default Accordion;