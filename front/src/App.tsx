import React from 'react';
import './App.css';
import RecentChangeComponent from './components/dash_board/recent_change';
import { CryptoService } from './services/crypto_service';

function App() {
  let cryptoService = CryptoService.create();
  return (
    <div className="App">
      <RecentChangeComponent cryptoService={cryptoService} />
    </div>
  );
}

export default App;
