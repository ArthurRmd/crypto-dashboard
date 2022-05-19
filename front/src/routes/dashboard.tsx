import React from 'react';
import CryptoComponent from '../components/crypto';
import {CryptoService} from '../services/crypto_service';
import ProfileComponent from "../components/user/profile";

export default function DashBoardRoute() {
    let cryptoService = CryptoService.create();
    return (
        <div>
            <ProfileComponent/>
            <CryptoComponent cryptoService={cryptoService}/>
        </div>
    );
}
