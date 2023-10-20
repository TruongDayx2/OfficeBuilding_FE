import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../css/admin.css';
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
        <div className="admin-container" style={{ marginTop: "100px", display: "flex", justifyContent: "flex-start" }}>
            <div className="menu-container" style={{ width: "30vw", background: "#161644", color: "#3A3D61", padding: "20px" }}>
                <h1>Admin</h1>
                <div className="menu-item" onClick={() => handleMenuClick('dashboard')} style={{ color: activeScreen === "dashboard" ? "#9197A8" : "#3A3D61" }} >
                    <div>
sfss
                    </div>
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
            <div className="active-screen-container" style={{ width: "70vw", padding: "20px" }}>
                {renderScreen()}
            </div>
        </div>
    );
}

function DashboardScreen() {
    return (
        <div>
            <h1>Dashboard Screen</h1>
            <p>This is the dashboard screen.</p>
        </div>
    );
}

function UsersScreen() {
    return (
        <div>
            <h1>Users Screen</h1>
            <p>This is the users screen.</p>
        </div>
    );
}

function SettingsScreen() {
    return (
        <div>
            <h1>Settings Screen</h1>
            <p>This is the settings screen.</p>
        </div>
    );
}

export default Admin;
