import React from 'react';

const TransactionShimmer = () => {
    return (
        <div className='flex flex-row items-center pb-5 border-b border-border-gray mb-5'>
                        <span className='w-24 h-24 shimmer-loading rounded'>
                        </span>
                        <div className=' flex flex-col justify-between flex-1 h-24 py-2'>
                            <div className='flex justify-between items-center pr-3'>
                                <div className='h-4 w-1/4 shimmer-loading'></div>
                                <div className='h-4 w-1/4 shimmer-loading'></div>
                            </div>
                            <div className='flex justify-between items-center pr-3'>
                                <div className='h-4 w-1/4 shimmer-loading'></div>
                                <div className='h-4 w-1/4 shimmer-loading'></div>
                            </div>
                        </div>
                    </div>
    );
};

export default TransactionShimmer;