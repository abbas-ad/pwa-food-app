import React, { useState,useEffect } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Toolbar from '../../components/Ui/Toolbar/Toolbar';
import {ReactComponent as BackIcon} from '../../assets/svgs/backIcon.svg'
import {ReactComponent as NoAddressIcon} from '../../assets/svgs/message/noAddressIcon.svg'
import Address from '../../components/Address/Address';
import { NavLink } from 'react-router-dom';
import ButtonPrimary from '../../components/Ui/Button/ButtonPrimary';
import ButtonSecondary from '../../components/Ui/Button/ButtonSecondary';
import Loading from '../../components/Loading/Loading';
import SnackBar from '../../components/Ui/SnackBar/SnackBar';
import AddressShimmer from '../../components/ShimmerLoading/Address/AddressShimmer';

const Addresses = (props) => {
    const [urlQueries,setUrlQueries] = useState(new URLSearchParams(props.location.search));
    const [deleteSnackBarOpen,setDeleteSnackBarOpen] = useState(false);
    const [deletedAddressId,setDeletedAddressId] = useState('');

    useEffect(()=>{
        props.onFetchAddresses(props.token,props.selectedAddress);
    },[]);

    const handleDeleteBtnClick = (addressId)=>{
        setDeletedAddressId(addressId);
        setDeleteSnackBarOpen(prev=>!prev);
    }

    const handleDeleteSnackBarBackDropClick = ()=>{
        setDeleteSnackBarOpen(false);
    }

    const handleChangeAddress = (id)=>{
        props.onSetSelectedAddress(id);
        if(urlQueries.get('redirect') === 'true'){
            props.history.goBack();
        }
    }
    const handleBackClick = ()=>{
        props.history.goBack();
    }
    const handleDeleteSnackBarBtnClick = ()=>{
        props.onDeleteAddress(props.token,deletedAddressId);
    }

    useEffect(()=>{
        handleDeleteSnackBarBackDropClick();
        if(props.deleteAddressResult === 'success'){
            props.onFetchAddresses(props.token,props.selectedAddress);
        }
    },[props.deleteAddressResult]);

    useEffect(()=>{
        if(props.addresses.filter(address=>address.status === '1').length === 1){
            props.onSetSelectedAddress(props.addresses.filter(address=>address.status === '1')[0].id);
        }else if(props.addresses.filter(address=>address.status === '1').length < 1) {
            props.onSetSelectedAddress(0);
        }else if(!props.addresses.filter(address=>address.status === '1').find(a=> +a.id === +props.selectedAddress)){
            props.onSetSelectedAddress(props.addresses.filter(address=>address.status === '1')[0].id);
        }
    },[props.addresses])
    return (
        <section className='min-h-screen bg-white relative pb-28 '>
           <Toolbar startIcon={<BackIcon onClick={handleBackClick} />}>آدرس</Toolbar> 

           {props.addresses.filter(address=>address.status === '1').length < 1 && !props.loading
           ?<div className='absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2'>
           <NoAddressIcon className='mx-auto'/>
           <p className='text-xl text-center mt-7 whitespace-nowrap'>هنوز هیچ آدرسی ثبت نشده !</p>
       </div>
            : null}

           <ul>
           {props.loading 
                ?<>
                <li className='my-3'><AddressShimmer /></li>
                <li className='my-3'><AddressShimmer /></li>
                <li className='my-3'><AddressShimmer /></li>
                <li className='my-3'><AddressShimmer /></li>
                <li className='my-3'><AddressShimmer /></li>
                <li className='my-3'><AddressShimmer /></li></>
                : props.addresses.filter(address=>address.status === '1').map((address,index)=>(
                    <li className='my-3' key={address.id}><Address selectedAddress={props.selectedAddress} 
                    address={address} onChange={handleChangeAddress} onDeleteBtnClick={handleDeleteBtnClick}/></li>
                ))}
           </ul>

           <div className='fixed bottom-0 left-0 right-0 p-6'>
                <NavLink to='/new-address'>
                    <ButtonPrimary>افزودن آدرس جدید</ButtonPrimary>
                </NavLink>
           </div>

           <SnackBar open={deleteSnackBarOpen} onBackDropClick={handleDeleteSnackBarBackDropClick} className='overflow-y-auto'>
               <p className='text-xl font-medium text-center mb-10'>آیا از حذف این آدرس اطمینان دارید ؟</p>
               <div className='flex flex-row items-start'>
               {props.deleteLoading 
                ?<Loading className='mt-7'/>
                :<>
                   <ButtonPrimary className='ml-5' onClick={handleDeleteSnackBarBtnClick}>حذف</ButtonPrimary>
                   <ButtonSecondary>بازگشت</ButtonSecondary></>}
               </div>
            </SnackBar>
        </section>
    );
};


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        addresses: state.user.addresses,
        selectedAddress: state.user.selectedAddress,
        loading: state.user.fetchLoading,
        deleteLoading: state.user.deleteLoading,
        deleteAddressResult: state.user.deleteAddressResult,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onFetchAddresses: (token,selecetdAddress) => dispatch(actions.fetchAddresses(token,selecetdAddress)),
        onSetSelectedAddress: (id) => dispatch(actions.setSelectedAddress(id)),
        onDeleteAddress: (token,id) => dispatch(actions.deleteAddress(token,id)),
    }
  }


export default connect( mapStateToProps, mapDispatchToProps )(Addresses);