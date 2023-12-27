import React,{useEffect, useState} from 'react';
import {ReactComponent as BackIcon} from '../../assets/svgs/backIcon.svg'
import {ReactComponent as EditIcon} from '../../assets/svgs/accountEditIcon.svg'
import {ReactComponent as RemoveEditIcon} from '../../assets/svgs/removeEditIcon.svg'

import Loading from '../../components/Loading/Loading'

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Toolbar from '../../components/Ui/Toolbar/Toolbar';
import InputPrimary from '../../components/Ui/Input/InputPrimary';
import ButtonPrimary from '../../components/Ui/Button/ButtonPrimary';
import { useForm } from "react-hook-form";

const Account = (props) => {
    const [user,setUser] = useState(props.user)
    const [editedActive,setEditedActive] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors }
      } = useForm({defaultValues: {first_name: user.first_name,last_name: user.last_name,phone: user.phone,
        landline_phone: user.landline_phone,email: user.email,
    }});

    const handleEditClick = ()=>{
        setEditedActive(prev=>!prev);
    }

    const handleFormSubmit = (data)=>{
        props.onUpdateUser(props.token,data);
    }

    useEffect(()=>{
        props.onFetchUser();
    },[props.userUpdateStatus]);

    const handleBackClick = ()=>{
        props.history.goBack();
    }

    return (
        <section className='bg-white pb-20 relative '>
            <Toolbar startIcon={<BackIcon onClick={handleBackClick} />} endIcon={editedActive ? <RemoveEditIcon /> :<EditIcon />} endIconClick={handleEditClick}>حساب کاربری</Toolbar>
            <form action="#" className='px-6 py-12' onSubmit={handleSubmit(handleFormSubmit)}>
                <InputPrimary label='نام' placeholder='نام' disabled={!editedActive} type='text' register={register} name='first_name'
                errors={errors}  validation={{required: true}}/>
                <InputPrimary className='mt-10' label='نام خانوادگی' disabled={!editedActive} placeholder='نام خانوادگی' type='text'
                 register={register} name='last_name'
                errors={errors}  validation={{required: true}}/>
                <InputPrimary className='mt-10' label='شماره تلفن همراه' disabled={!editedActive} placeholder='شماره تلفن همراه' type='tel' 
                 register={register} name='phone'
                errors={errors}  validation={{required: true}}/>
                <InputPrimary className='mt-10' label='شماره تلفن ثابت' disabled={!editedActive} placeholder='شماره تلفن ثابت' type='tel'
                 register={register} name='landline_phone'
                 errors={errors}  validation={{required: true}}/>
                <InputPrimary className='mt-10' label='پست الکترونیکی' disabled={!editedActive} placeholder='پست الکترونیکی' type='email' 
                register={register} name='email'
                errors={errors}  validation={{required: true}}/>
                {editedActive 
                ?<div className='fixed bottom-6 left-0 right-0 px-6'>
                {props.loading ? <Loading /> : <ButtonPrimary type='submit'>ذخیره اطلاعات</ButtonPrimary>}
                </div>
                 : null}
                
            </form>
        </section>
    );
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        user: state.user.user,
        userUpdateStatus: state.user.userUpdateStatus,
        loading: state.user.editLoading,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onFetchUser: () => dispatch(actions.fetchUser()),
        onUpdateUser: (token,user) => dispatch(actions.updateUser(token,user)),
    }
  }
export default connect( mapStateToProps, mapDispatchToProps )(Account);