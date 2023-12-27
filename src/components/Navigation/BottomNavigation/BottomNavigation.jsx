import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import {ReactComponent as HomeIcon} from '../../../assets/svgs/menuHomeIcon.svg';
import {ReactComponent as SearchIcon} from '../../../assets/svgs/menuSearchIcon.svg';
import {ReactComponent as OrdersIcon} from '../../../assets/svgs/menuOrdersIcon.svg';
import {ReactComponent as ProfileIcon} from '../../../assets/svgs/menuProfileIcon.svg';
import classes from './BottomNavigation.module.scss'
const BottomNavigation = () => {
    return (
        <nav className={classNames('flex flex-row fixed bottom-0 left-0 right-0 py-4 bg-white z-50 shadow-accordion')}>
            <NavLink to='/home' exact activeClassName={classes.ActiveRoute} className='flex-1 flex flex-col items-center text-base text-gray-primary'>
                <HomeIcon className='mb-2 fill-current text-secondary' />
                خانه
            </NavLink>

            <NavLink to='/search' exact activeClassName={classes.ActiveRoute} className='flex-1 flex flex-col items-center text-base text-gray-primary'>
                <SearchIcon className='mb-2 fill-current text-secondary stroke-current' />
                جستجو
            </NavLink>

            <NavLink to='/orders' exact activeClassName={classes.ActiveRoute} className='flex-1 flex flex-col items-center text-base text-gray-primary'>
                <OrdersIcon className='mb-2 fill-current text-secondary' />
                سفارش ها
            </NavLink>

            <NavLink to='/profile' exact activeClassName={classes.ActiveRoute} className='flex-1 flex flex-col items-center text-base text-gray-primary'>
                <ProfileIcon className='mb-2 fill-current text-secondary' />
                پروفایل
            </NavLink>
        </nav>
    );
};

export default BottomNavigation;