import React from 'react';

const ProductVerticalShimmer = () => {
    return (
        <div className='w-96 p-5 shadow-accordion'>
        <div className='w-full h-72 rounded shimmer-loading'></div>

        <div className='w-1/4 h-4 rounded shimmer-loading my-5'></div>
        <div className='w-2/4 h-4 rounded shimmer-loading mb-5'></div>
        <div className='w-1/4 h-4 rounded shimmer-loading mb-5'></div>
        

        <div className='flex flex-row justify-between mt-4'>
        <div className='w-1/2 h-4 rounded shimmer-loading mb-5 ml-2'></div>
        <div className='w-1/2 h-4 rounded shimmer-loading mb-5'></div>
        </div>

    </div>
    );
};

export default ProductVerticalShimmer;