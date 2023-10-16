
import React from 'react';
import { Icon } from '@iconify/react';

const footerStyles = {
    display: 'flex',
    justifyContent: 'space-evenly',
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px 0',
};

const columnStyles = {
    display: 'flex',
    flexDirection: 'column',
};




const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const facebookFrameStyles = {
    width: '300px',
    height: '150px',
    border: '1px solid #ccc',
    background: "white",
    backgroundSize: 'cover',
};




const searchContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    width: '300px',
    margin: '10px auto',
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '5px',
};

const searchInputStyles = {
    border: 'none',
    outline: 'none',
    width: '85%',
    padding: '5px',
};

const searchButtonStyles = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
};



function Footer() {
    return (
        <footer style={footerStyles}>
            <div style={columnStyles}>
                <ul >
                    <li>77 building</li>
                    <li>công nghệ để thay đổi cuộc sống</li>
                    <li>Công nghệ để Tiết kiệm sức lao động</li>
                    <li>Công nghệ để tối ưu công việc</li>
                    <li>
                        <Icon icon="bx:bx-phone-call" /> 1900 0000
                    </li>
                </ul>
            </div>

            <div style={columnStyles}>
                <ul>
                    <li>
                        <Icon icon="bx:bx-home" /> 77 building
                    </li>
                    <li>
                        <Icon icon="bx:bx-phone-call" /> 1900 0000
                    </li>
                    <li>
                        <Icon icon="bx:bx-envelope" /> 77building@77building.com
                    </li>
                    <li>
                        <Icon icon="bx:bx-map" /> 77 building
                    </li>
                    <li>
                        <Icon icon="bx:bx-time-five" /> 24/7
                    </li>
                </ul>
            </div>

            <div style={columnStyles}>

                <div style={containerStyles}>
                    <div style={facebookFrameStyles}></div>
                    <div style={searchContainerStyles}>
                        <input type="text" style={searchInputStyles} placeholder="Tìm kiếm trên Facebook" />
                        <button style={searchButtonStyles}>
                            <Icon icon="bi:send" />
                        </button>
                    </div>
                </div>

            </div>


        </footer>
    );
}

export default Footer;



