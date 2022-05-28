import React from 'react';
import CryptoComponent from '../components/crypto';
import {CryptoService} from '../services/crypto_service';

export default function DashBoardRoute() {
    let cryptoService = CryptoService.create();
    return (
        <div>
            <CryptoComponent cryptoService={cryptoService}/>
        </div>
    );
}
