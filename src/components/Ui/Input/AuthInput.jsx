import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import classes from './Input.module.scss';
const AuthInput = (props) => {
    const authRef0 = useRef(null);
    const authRef1 = useRef(null);
    const authRef2 = useRef(null);
    const authRef3 = useRef(null);
    const authRef4 = useRef(null);

    const [authCode,setAuthCode] = useState(props.value)

    const updateAuthCode = (i,value)=>{
        let codes = [...authCode];
        codes[i] = value;
        setAuthCode(codes);
    }
    const handleAuthChange = (value,i)=>{
        switch (i) {
            case 0:
                if(value.target.value) authRef1.current.focus();
                updateAuthCode(0,value.target.value);
                break;
            case 1:
                value.target.value ? authRef2.current.focus() : authRef0.current.focus();
                updateAuthCode(1,value.target.value);
                break;
            case 2:
                value.target.value ? authRef3.current.focus() : authRef1.current.focus();
                updateAuthCode(2,value.target.value);
                break;
            case 3:
                value.target.value ? authRef3.current.focus() : authRef2.current.focus();
                updateAuthCode(3,value.target.value);
                break;
            default:
                break;
        }
    }

    useEffect(()=>{
        props.onChange(authCode);
    },[authCode])

    return (
        <div className={classNames('flex flex-row items-center justify-around px-16',classes.AuthCodeInput)}>
            <input type="tel" ref={authRef3} className='bg-gray-secondary w-20 h-20 text-4xl text-center font-medium focus:outline-black' maxLength={1} value={authCode[3]} onChange={(v)=>handleAuthChange(v,3)}/>
            <input type="tel" ref={authRef2} className='bg-gray-secondary w-20 h-20 text-4xl text-center font-medium focus:outline-black' maxLength={1} value={authCode[2]} onChange={(v)=>handleAuthChange(v,2)}/>
            <input type="tel" ref={authRef1} className='bg-gray-secondary w-20 h-20 text-4xl text-center font-medium focus:outline-black' maxLength={1} value={authCode[1]} onChange={(v)=>handleAuthChange(v,1)}/>
            <input type="tel" ref={authRef0} className='bg-gray-secondary w-20 h-20 text-4xl text-center font-medium focus:outline-black' maxLength={1} value={authCode[0]} autoFocus onChange={(v)=>handleAuthChange(v,0)}/>
        </div>
    );
};



export default AuthInput;