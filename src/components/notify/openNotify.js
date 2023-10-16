import React, { useState, useContext } from 'react';
import { NotifiContext } from './notify';
import '../css/login.css'
import { useEffect } from 'react';

const openNotifi = () => {
    //Retrieve context data
    const notifi = useContext(NotifiContext);

    const [isNotifi, setIsNotifi] = useState(0)

    useEffect(() => {
        document.querySelector('.msg-log-all').textContent = notifi.errorCode;
        setIsNotifi(notifi.errorCode);
        document.querySelector('.msg-log-all').classList.add('active');
        setTimeout(() => {
            // document.querySelector('.msg-log').classList.remove('active');
            setVisible(false);
        }, 1200);
        console.log("code", notifi.errorCode);
    },[notifi.errorCode])


    return (

        <div className="msg-log-all"
            style={{
                backgroundColor: isNotifi === 1 ? "red" : "green",
            }}></div>
    )
}
