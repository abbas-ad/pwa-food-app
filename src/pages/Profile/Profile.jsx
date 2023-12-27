import React from 'react';
import {ReactComponent as Avatar} from '../../assets/svgs/avatar.svg'
import {ReactComponent as HomeIcon} from '../../assets/svgs/menuHomeIcon.svg'
import {ReactComponent as HeartIcon} from '../../assets/svgs/fillHeartBlackIcon.svg'
import {ReactComponent as WalletIcon} from '../../assets/svgs/walletIcon.svg'
import {ReactComponent as UserIcon} from '../../assets/svgs/menuProfileIcon.svg'
import {ReactComponent as InstallIcon} from '../../assets/svgs/installIcon.svg'
import {ReactComponent as LogoutIcon} from '../../assets/svgs/logoutIcon.svg'
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import { NavLink } from 'react-router-dom';
const Profile = (props) => {

    const handleLogoutClick = ()=>{
        props.onLogout();
    }
    return (
        <section className='bg-white px-6 pb-20'>
            <div className='flex flex-col items-center justify-center py-16'>
                <Avatar />
                <p className='my-5 font-bold text-4xl'>
                    {props.isAuthenticated 
                    ? props.user.first_name && props.user.last_name 
                    ? `${props.user.first_name} ${props.user.last_name}`
                    : 'کاربر'
                    : 'وارد حساب کاربری خود شوید'}</p>
                {props.isAuthenticated ? <p className='font-medium text-xl'>{props.user.phone}</p> : null}
            </div>

            <ul>
                <li className='text-lg font-semibold border-b border-border-gray px-2'>
                    <NavLink to='/addresses' className='flex items-center py-6'>
                    <HomeIcon className='ml-3 flex-10' />
                    مدیریت آدرس ها
                    </NavLink>
                    
                </li>

                <li className='text-lg font-semibold border-b border-border-gray px-2 mt-3'>
                    <NavLink to='/favorites' className='flex items-center py-6'>
                    <HeartIcon className='ml-3 flex-10' />
                    محبوب ها
                    </NavLink>
                </li>

                <li className='text-lg font-semibold border-b border-border-gray px-2 mt-3'>
                    <NavLink to='/wallet' className='flex items-center py-6'>
                        <WalletIcon className='ml-3 flex-10' />
                        کیف پول من
                    </NavLink>
                </li>

                <li className='text-lg font-semibold border-b border-border-gray px-2 mt-3'>
                    <NavLink to='/account' className='flex items-center py-6'>
                        <UserIcon className='ml-3 flex-10' />
                        اطلاعات حساب
                    </NavLink>
                </li>

                <li className='text-lg font-semibold px-2 mt-3'>
                    <NavLink to='#' className='flex items-center py-6'>
                        <InstallIcon className='ml-3 flex-10' />
                        نصب برنامه
                    </NavLink>
                </li>
            </ul>

            <div onClick={handleLogoutClick} className='text-lg font-bold text-red-primary flex flex-row items-center my-16'>
                <LogoutIcon className='ml-3 flex-10'/>
                خروج از حساب کاربری
            </div>
        </section>
    );
};


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        user: state.user.user
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
        onLogout: () => dispatch(actions.logout()),
    }
  }

export default connect( mapStateToProps, mapDispatchToProps )(Profile);