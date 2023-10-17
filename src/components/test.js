import React, { useState, useEffect,useContext } from 'react';

import {NotifiContext} from './notify/notify';

function Test() {
    const {errorCode,setErrorCode} = useContext(NotifiContext);

    const handleClick = () => {
        setErrorCode(1);

    };

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button onClick={handleClick}>Open Notification</button>
        </div>
    );
}

export default Test;