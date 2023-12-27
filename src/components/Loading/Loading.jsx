import classNames from 'classnames';
import React from 'react';

const Loading = (props) => {
    return (
        <div className={classNames(props.className,"ma-loading grid grid-cols-2 w-12 mx-auto h-12 gap-1")}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
        </div>
    );
};

export default Loading;