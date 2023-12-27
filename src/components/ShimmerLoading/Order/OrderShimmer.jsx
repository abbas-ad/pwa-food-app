import React from 'react';
import {ReactComponent as ArrowLeftIcon} from '../../../assets/svgs/orderStep/arrowLeftIcon.svg'

const OrderShimmer = () => {
    return (
        <div className='bg-white px-6 shadow py-5'>
            <div className='flex flex-row items-center justify-between mb-14'>
                <div className='w-1/3 h-4 shimmer-loading'></div>
                <div className='w-1/3 h-4 shimmer-loading'></div>
            </div>

            <div className='w-2/3 h-4 shimmer-loading mx-auto mb-2'></div>
            <p className='w-1/3 h-4 shimmer-loading mx-auto mt-5'></p>

            <div className='flex flex-row items-center mt-10'>
                <div className='w-20 h-20 shimmer-loading'>
                </div>
                <span className='flex-1 flex items-center justify-center'><ArrowLeftIcon/></span>
                <div className='w-20 h-20 shimmer-loading'>
                </div>
                <span className='flex-1 flex items-center justify-center'><ArrowLeftIcon/></span>
                <div className='w-20 h-20 shimmer-loading'>
                </div>
                <span className='flex-1 flex items-center justify-center'><ArrowLeftIcon/></span>
                <div className='w-20 h-20 shimmer-loading'>
                </div>
            </div>

            <div className='flex flex-row items-center justify-between mt-10'>
                <div className='h-20 w-1/2 rounded shimmer-loading'>
                </div>

                <div  className='w-1/4 h-4 shimmer-loading rounded'> </div>


            </div>
             <div className='mt-10 h-20 w-full shimmer-loading rounded'></div>
        </div>
    );
};

export default OrderShimmer;