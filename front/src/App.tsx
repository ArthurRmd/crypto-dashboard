import React from 'react';
import './App.css';
import RecentChangeComponent, { RecentChangeProps } from './components/dash_board/recent_change';
import { CryptoService } from './services/crypto_service';

function App() {
  let props = {cryptoService: CryptoService.create()};
  return (
    <div className="App">
      <RecentChangeComponent props={props} />
    </div>
  );
}

export default App;
