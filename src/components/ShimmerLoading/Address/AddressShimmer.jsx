import React from 'react';

const AddressShimmer = () => {
    return (
        <div className='shadow-accordion p-6 h-40'>
        <div className='flex flex-row h-full items-center'>
            <div className='self-center'>
                 <div className='w-9 h-9 rounded-circle shimmer-loading'>
                    
                </div>
            </div>
            <div className='px-5 flex-1'>
                <div className='text-lg font-semibold mb-5 shimmer-loading w-2/3 h-4 rounded-md'></div>
                <div className='shimmer-loading w-1/3 h-4 rounded-md'></div>
            </div>
            <div className='w-2 h-10 mt-3 shimmer-loading self-start rounded-md'></div>
        </div>
        </div>
    );
};

export default AddressShimmer;