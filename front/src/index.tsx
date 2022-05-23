import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import MainMenu from './components/menu/main_menu';
import {Provider} from 'react-redux'
import store from './store'
import {CryptoDashBoardRouter} from "./routes/router";
import {Container} from "@mui/material";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <MainMenu/>
                <Container maxWidth="lg">
                    <CryptoDashBoardRouter/>
                </Container>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

