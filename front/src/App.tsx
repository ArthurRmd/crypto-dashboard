import React from 'react';
import './App.css';
import RecentChangeComponent from './components/dash_board/recent_change';
import MainMenu from './components/menu/main_menu';
import { CryptoService } from './services/crypto_service';

function App() {
  let cryptoService = CryptoService.create();
  return (
    <div className="App">
      <MainMenu></MainMenu>
      <RecentChangeComponent cryptoService={cryptoService} />
    </div>
  );
}

export default App;
