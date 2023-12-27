import React from 'react';
import { NavLink } from 'react-router-dom';
import BuildingImage from '../../assets/img/splash.png'
import {ReactComponent as MaIcon} from '../../assets/svgs/maLogo/maWhiteIcon.svg'
import {ReactComponent as ForkIcon} from '../../assets/svgs/forkWhiteIcon.svg'
import {ReactComponent as BasketIcon} from '../../assets/svgs/basketWhiteIcon.svg'
import {ReactComponent as TruckIcon} from '../../assets/svgs/truckWhiteIcon.svg'

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
const Splash = (props) => {
    return (
        <section className='min-h-screen bg-splash relative flex items-center justify-center z-50'>
            <div className='bg-primary bg-opacity-70 absolute top-0 left-0 right-0 bottom-0 z-20'></div>
            <div className='z-50 flex flex-col items-center justify-center mb-14'>
                <MaIcon />
                <h5 className='text-4xl font-bold text-center text-white my-10'>بخش مورد نظر خود را انتخاب کنید:</h5>

                <ul className='text-white text-4xl w-full px-16'>
                    <li className='border border-white rounded-xl py-1'>
                        <NavLink to='/home' className='flex items-center' onClick={()=>props.onSetIsMarket(false)}>
                            <ForkIcon className='border-l border-white flex-20'/>
                            <p className='flex-1 text-center'>ما فود</p>
                        </NavLink>
                    </li>
                    <li className='border border-white rounded-xl py-1 my-5'>
                        <NavLink to='/home' className='flex items-center' onClick={()=>props.onSetIsMarket(true)}>
                            <BasketIcon className='border-l border-white flex-20'/>
                            <p className='flex-1 text-center'>ما مارکت</p>
                        </NavLink>
                    </li>
                    <li className='border border-white rounded-xl py-1'>
                        <NavLink to='#' className='flex items-center'>
                            <TruckIcon className='border-l border-white flex-20'/>
                            <p className='flex-1 text-center'>ما پیک</p>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </section>
    );
};


const mapStateToProps = state => {
    return {
        isMarket: state.user.isMarket ,

    
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onSetIsMarket: (result) => dispatch(actions.setIsMarket(result)),
    }
  }


export default connect( mapStateToProps, mapDispatchToProps )(Splash);