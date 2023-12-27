import React from 'react';

const ItemShimmer = () => {
    return (
        <div className='p-6 shadow-accordion mt-5 flex flex-row bg-white'>
            <div className='w-40 h-40 shimmer-loading rounded'>

            </div>
                <div className='flex-1 flex flex-col justify-around px-3'>
                    <div className='h-4 w-1/2 shimmer-loading rounded'></div>
                    <div className='flex flex-row items-center mt-5'>
                        <div className='h-4 w-6/12 shimmer-loading rounded'></div>
                        <div className='h-4 w-2/12 shimmer-loading rounded mr-5'></div>
                        <div className='h-4 w-2/12 shimmer-loading rounded mr-5'></div>
                    </div>
                    <div className='h-4 w-1/2 shimmer-loading rounded mt-4'></div>
                </div>
        </div>
    );
};

export default ItemShimmer;