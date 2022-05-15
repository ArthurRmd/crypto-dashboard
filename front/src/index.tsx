import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import MainMenu from './components/menu/main_menu';
import {Provider} from 'react-redux'
import store from './store'
import {CryptoDashBoardRouter} from "./routes/router";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <MainMenu/>
                <CryptoDashBoardRouter/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

