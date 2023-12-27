import React, { useEffect } from 'react';
import Toolbar from '../../components/Ui/Toolbar/Toolbar';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import {ReactComponent as BackIcon} from '../../assets/svgs/backIcon.svg'
import Select from '../../components/Ui/Select/Select';
import InputPrimary from '../../components/Ui/Input/InputPrimary';
import ButtonPrimary from '../../components/Ui/Button/ButtonPrimary';
import { useForm } from "react-hook-form";
import Loading from '../../components/Loading/Loading'
const NewAddress = (props) => {

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors }
      } = useForm();

    useEffect(()=>{
        props.onFetchCities(props.token)
    },[])

    const handleChangeCity = (cityId)=>{
        props.onFetchRegions(props.token,cityId);
    }

    const handleChangeRegion = (regionId)=>{
        props.onFetchStreets(props.token,regionId);
    }

    const handleFormSubmit = (data)=>{
        const address = {city_id: data.city,neighbourhood_id: data.neighbourhood,street_id: data.street
        ,address: data.address,full_name: data.full_name,phone: data.phone}
        props.onAddAddress(props.token,address);
    }

    const handleBackClick = ()=>{
        props.history.goBack();
    }
    useEffect(()=>{
        if(props.addAddressResult === 'success'){
            handleBackClick();
        }
    },[props.addAddressResult])
    return (
        <section className='min-h-screen bg-white relative pb-28'>
            <Toolbar startIcon={<BackIcon onClick={handleBackClick} />}>آدرس</Toolbar> 
            
            <form className='p-6' onSubmit={handleSubmit(handleFormSubmit)}>
                <Select placeholder="شهر" className='mb-6' data={props.cities} name='city' register={register} setValue={setValue}
                errors={errors}  validation={{required: true}}
                 onChange={handleChangeCity}/>
                <Select placeholder="محله" className='mb-6' data={props.regions} name='neighbourhood'
                register={register} setValue={setValue}
                errors={errors}  validation={{required: true}}
                onChange={handleChangeRegion}/>
                <Select placeholder="خیابان" className='mb-6' data={props.streets} name='street' register={register} setValue={setValue}
                errors={errors}  validation={{required: true}}
                onChange={()=>{}}/>
                <InputPrimary type='text' className='mt-8' register={register} name='address'
                errors={errors}  validation={{required: true}}
                placeholder='مثال : خیابان زند - کوچه یاس - پلاک 1' label='آدرس' labelclassName='text-primary'/>
                <InputPrimary type='text' className='mt-8' placeholder='مثال : سینا رضوانی' register={register} name='full_name'
                errors={errors}  validation={{required: true}}
                label='نام و نام خانوادگی گیرنده' labelclassName='text-primary'/>
                <InputPrimary type='tel' className='mt-8' placeholder='مثال : 09157779922' register={register} name='phone'
                errors={errors}  validation={{required: true}}
                label='شماره تلفن گیرنده' labelclassName='text-primary'/>

                <div className='fixed right-0 bottom-0 left-0 p-6'>
                    {props.loading ? <Loading /> : <ButtonPrimary className=''>ذخیره آدرس</ButtonPrimary>}
                </div>
            </form>
        </section>
    );
};


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        cities: state.user.cities,
        streets: state.user.streets,
        regions: state.user.regions,
        loading: state.user.addLoading,
        addAddressResult: state.user.addAddressResult
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onFetchCities: (token) => dispatch(actions.fetchCities(token)),
        onFetchRegions: (token,cityId) => dispatch(actions.fetchRegions(token,cityId)),
        onFetchStreets: (token,regionId) => dispatch(actions.fetchStreets(token,regionId)),
        onAddAddress: (token,address) => dispatch(actions.addAddress(token,address)),
    }
  }

export default connect( mapStateToProps, mapDispatchToProps )(NewAddress);