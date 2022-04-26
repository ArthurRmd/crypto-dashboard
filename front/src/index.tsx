import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from './routes/dashboard';
import MainMenu from './components/menu/main_menu';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <BrowserRouter>

      <MainMenu />

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="dashboard" element={<DashBoard />} />
      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);

