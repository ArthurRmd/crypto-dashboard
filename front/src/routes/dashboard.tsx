import React from 'react';
import RecentChangeComponent from '../components/dash_board/recent_change';
import { CryptoService } from '../services/crypto_service';

export default function DashBoard() {
  let cryptoService = CryptoService.create();
  return (
    <RecentChangeComponent cryptoService={cryptoService} />
  );
}
