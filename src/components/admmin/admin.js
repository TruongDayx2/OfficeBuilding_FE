import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './admin.css';
import UsersScreen from './userScreen';
import SettingsScreen from './settingScreen';
import DashboardScreen from './dashBoardScreen';

function Admin() {
    const [activeScreen, setActiveScreen] = useState('dashboard');
    const messageLogin = useSelector(state => state.login.data);
    // const dataUser = JSON.parse(localStorage.getItem('DataUser'));

    const handleMenuClick = (screen) => {
        setActiveScreen(screen);
    }
    const renderScreen = () => {
        switch (activeScreen) {
            case 'dashboard':
                return <DashboardScreen />;
            case 'users':
                return <UsersScreen />;
            case 'settings':
                return <SettingsScreen />;
            default:
                return null;
        }
    }


    return (
        <div className="admin-container" style={{ marginTop: "100px", display: "flex", justifyContent: "flex-start" , height:"63vh"}}>
            <div className="menu-container" style={{ width: "20vw", background: "#161644", color: "#3A3D61", padding: "20px" }}>
                <h1>Admin</h1>
                <div className="menu-item" onClick={() => handleMenuClick('dashboard')} style={{ color: activeScreen === "dashboard" ? "#9197A8" : "#3A3D61" }} >
                    <div>
                        Dashboard
                    </div>
                </div>
                <div className="menu-item" onClick={() => handleMenuClick('users')} style={{ color: activeScreen === "users" ? "#9197A8" : "#3A3D61" }} >
                    Users
                </div>
                <div className="menu-item" onClick={() => handleMenuClick('settings')} style={{ color: activeScreen === "settings" ? "#9197A8" : "#3A3D61" }}>
                    Settings
                </div>
            </div>
            <div className="active-screen-container" style={{ width: "80vw", padding: "20px" }}>
                {renderScreen()}
            </div>
        </div>
    );
}





export default Admin;
