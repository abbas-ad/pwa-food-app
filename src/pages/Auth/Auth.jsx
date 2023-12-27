import React, { useEffect, useState } from 'react';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

import {ReactComponent as MaLogo} from '../../assets/svgs/maLogo/maLogo.svg'
import ButtonPrimary from '../../components/Ui/Button/ButtonPrimary';
import ButtonSecondary from '../../components/Ui/Button/ButtonSecondary';
import AuthInput from '../../components/Ui/Input/AuthInput';
import { useForm } from "react-hook-form";
import Loading from '../../components/Loading/Loading';
import InputSecondary from '../../components/Ui/Input/InputSecondary';

const Auth = (props) => {
    const [step,setStep] = useState('phone');
    const [phone,setPhone] = useState('');
    const [authCode,setAuthCode] = useState(['','','','']);
    const [authCodeExpireIn,setAuthCodeExpireIn] = useState('');
    const [authRedirect,serAuthRedirect] = useState(null);

    const {
        handleSubmit,
        register,
        formState: { errors }
      } = useForm();

      const {
        handleSubmit: handleSubmitActiveCode,
        register: registerActiveCode,
        formState: { errors: errorsActiveCode }
      } = useForm();

    const handleSubmitPhoneForm = (data)=>{
        setPhone(data.phone);
        props.onGetAuthCode(data.phone);
    }

    useEffect(()=>{
        if(props.authCodeStatus === 'success'){
            if ('OTPCredential' in window) {
                const ac = new AbortController();
                navigator.credentials.get({
                  otp: { transport:['sms'] },
                  signal: ac.signal
                }).then(otp => {
                  alert(otp.code);
                    setAuthCode(otp.code.split(''))
                    ac.abort()
                }).catch(err => {
                  ac.abort();
                  console.log(err);
              });
            }
            setStep('authCode');
            const countDownDate = new Date().getTime()+60000;
            let interval = setInterval(function() {
                var now = new Date().getTime();
                var distance = countDownDate - now;
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setAuthCodeExpireIn('0'+minutes+':'+seconds)
                if (distance < 0) {
                  clearInterval(interval);
                }
              }, 1000);
        }
    },[props.authCodeStatus]);

    useEffect(()=>{
        if(authCode.filter(c=> c !== '').length > 3){
            const user = {phone: phone,active_code: authCode.join('')};
            props.onLogin(user);
        }
    },[authCode])

    const handleSubmitAuthCodeForm = (data)=>{
        const user = {phone: phone,active_code: authCode.join('')};
        if(authCode.filter(c=> c !== '').length > 3)
        props.onLogin(user)
    }

    useEffect(()=>{
        if(props.loginStatus === 'success'){
            if(props.user.first_name && props.user.last_name){
                serAuthRedirect(<Redirect to={props.authRedirectPath} />)
            }else{
                setStep('information')
            }
        }
    },[props.loginStatus])

    const handleSubmitInformationForm = (data)=>{
        props.onUpdateUser(props.token,{first_name: data.first_name,last_name: data.last_name});
    }
    const handleBackClick = ()=>{
        switch (step) {
            case 'authCode':
                setStep('phone')
                break;
                case 'information':
                    setStep('authCode')
                    break;
            default:
                break;
        }
    }

    const handleAuthCodeChange = (v)=>{
        setAuthCode(v);
    }

    // useEffect(()=>{
    //     if ('OTPCredential' in window) {
    //           const ac = new AbortController();
    //           navigator.credentials.get({
    //             otp: { transport:['sms'] },
    //             signal: ac.signal
    //           }).then(otp => {
    //             alert(otp.code);
    //               setAuthCode(otp.code.split(''))
    //               ac.abort()
    //           }).catch(err => {
    //             ac.abort();
    //             console.log(err);
    //         });
    //       }
    // })
    return (
        <section className='bg-white h-screen px-6 relative'>
            {authRedirect}
            <span className='flex flex-row justify-center items-center py-28'><MaLogo /></span>
            <h3 className='text-center text-4xl font-bold'>ورود یا ثبت نام</h3>

            {step === 'phone'
            ?<form className='py-5' onSubmit={handleSubmit(handleSubmitPhoneForm)}>
            <p className='text-center text-xl font-medium mb-10'>لطفا شماره تلفن همراه خود را وارد کنید</p>
                <InputSecondary type='tel' placeholder='شماره تلفن' name='phone' register={register} 
                errors={errors}  validation={{required: true,minLength: 11,maxLength: 11}}/>
                {props.loading ? <Loading className='mt-36' /> :<ButtonPrimary className='mt-36' type='submit'>دریافت کد فعال سازی</ButtonPrimary>}
            </form> : null }


            {step === 'authCode'
            ?<form className='py-5' onSubmit={handleSubmitActiveCode(handleSubmitAuthCodeForm)}>
                <p className='text-center text-xl font-medium mb-10'>لطفا کد فعالسازی ارسال شده را وارد فرمایید</p>
                <AuthInput name='active-code' value={authCode} onChange={handleAuthCodeChange}/>
                {props.loginStatus === 'failed' ? <p className='text-red-primary text-center text-xl mt-10'>متاسفانه کد فعال سازی را اشتباه وارد کرده اید !</p> : null}
                <p className='text-xl mt-10 text-center'>تا ارسال مجدد کد فعال سازی ({authCodeExpireIn})</p>
                {props.loading ? <Loading className='mt-20' /> :<div className='flex flex-row items-center mt-20'>
                    <ButtonPrimary className='flex-60 ml-5' type='submit'>بعدی</ButtonPrimary>
                    <ButtonSecondary className='flex-1' type='button' onClick={handleBackClick}>بازگشت</ButtonSecondary>
                </div>}
            </form> : null }

            {step === 'information'
            ?<form className='py-5' onSubmit={handleSubmit(handleSubmitInformationForm)}>
                <p className='text-center text-xl font-medium mb-10'>لطفا اطلاعات زیر را تکمیل فرمایید</p>
                <InputSecondary type='text' placeholder='نام' className='my-8' name='first_name' register={register} 
                errors={errors}  validation={{required: true}}/>
                <InputSecondary type='text' placeholder='نام خانوادگی' className='mt-10' name='last_name' register={register} 
                errors={errors}  validation={{required: true}}/>
                
                <div className='flex flex-row items-center mt-16'>
                    {props.editLoading
                    ?<Loading  />
                    :<>
                        <ButtonPrimary className='flex-60 ml-5' type='submit'>ورود</ButtonPrimary>
                        <ButtonSecondary className='flex-1' type='button' onClick={handleBackClick}>بازگشت</ButtonSecondary>
                    </>}
                </div>
            </form> : null }
        </section>
    );
};


const mapStateToProps = state => {
    return {
        user: state.auth.user,
        token: state.auth.registerToken,
        authCodeStatus: state.auth.authCodeStatus,
        loginStatus: state.auth.loginStatus,
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        editLoading: state.user.editLoading,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onGetAuthCode: (phone) => dispatch(actions.getAuthCode(phone)),
        onLogin: (user) => dispatch(actions.login(user)),
        onUpdateUser: (token,user) => dispatch(actions.updateUser(token,user)),
    }
  }
export default connect( mapStateToProps, mapDispatchToProps )(Auth);