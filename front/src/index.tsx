import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DashBoard from './routes/dashboard';
import MainMenu from './components/menu/main_menu';
import Register from './routes/register';
import Login from './routes/login';
import {Provider} from 'react-redux'
import store from './store'
import Logout from './routes/logout';
import Profile from "./routes/profile";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>

                <MainMenu/>

                <Routes>
                    <Route path="/" element={<App/>}/>
                    <Route path="dashboard" element={<DashBoard/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route path="sign-in" element={<Login/>}/>
                    <Route path="log-out" element={<Logout/>}/>
                    <Route path="profile" element={<Profile/>}/>
                </Routes>

            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

