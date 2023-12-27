import React from 'react';

const VerticalRestaurantShimmer = () => {
    return (
        <div className='bg-white p-4'>
            <div className='h-72 relative shimmer-loading'></div>

            <div className='shimmer-loading h-4 rounded-md mt-4'></div>
            <div className='shimmer-loading h-4 rounded-md mt-3'></div>
            
            <div className='flex flex-row items-center mt-3'>
                <div className='shimmer-loading h-4 w-36 rounded-md ml-5'></div>
                <div className='shimmer-loading h-4 w-36 rounded-md'></div>
        </div>
        </div>
    );
};

export default VerticalRestaurantShimmer;