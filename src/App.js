import './App.css';
import Header from './components/Header';
import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'
// import "swiper/css/bundle";
import Login from './components/Login';
import Home1 from './components/Home1';
import Floor1 from './components/Floor1';
import Room from './components/Room';
import Equip from './components/Equip';
import Room1 from './components/Room1';
import Equip1 from './components/Equip1';
import Company1 from './components/Company1';
import Rental1 from './components/Rental1';
import Service1 from './components/Service1';
import ServiceContract1 from './components/ServiceContract';

function App() {
    // const isAdmin = useSelector(state => state.login.isAdmin);
    return (
        <div className="App">
            <Router>
                <Header />
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/company1">
                        <Company1 />
                    </Route>
                    <Route path="/floor1">
                        <Floor1 />
                    </Route>
                    <Route path="/rooms">
                        <Room />
                    </Route>
                    <Route path="/room1">
                        <Room1 />
                    </Route>
                    <Route path="/equips">
                        <Equip />
                    </Route>
                    <Route path="/equip1">
                        <Equip1 />
                    </Route>
                    <Route path="/service1">
                        <Service1 />
                    </Route>
                    <Route path="/rental1">
                        <Rental1 />
                    </Route>
                    <Route path="/serviceContract1">
                        <ServiceContract1 />
                    </Route>
                    <Route path="/">
                        <Home1 />
                    </Route>
                    
                </Switch>
            </Router>
        </div>
    );
}

export default App;