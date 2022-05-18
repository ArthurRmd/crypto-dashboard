import React, {useEffect, useState} from "react";
import {CryptoService} from "../services/crypto_service";
import {DashBoardCryptDo} from "../models/do/dashboard_crypto";

import {DataGrid, GridColDef} from '@mui/x-data-grid';

export interface CryptoComponentProps {
    cryptoService: CryptoService;
}

function convertRows(cryptos: DashBoardCryptDo[]) {
    const rows = [];
    for (const key in cryptos) {
        let crypto = cryptos[key];
        rows.push({
            id: key,
            currency: crypto.currencyName,
            gain_24h: crypto.gainLast24Hours,
            total_wallet: crypto.totalWallet,
            total: crypto.totalWalletDifference,
        });
    }
    return rows;
}

export default function CryptoComponent({cryptoService}: CryptoComponentProps) {

    const [cryptos, setCryptos] = useState<DashBoardCryptDo[]>([]);


    useEffect(() => {
        cryptoService.fetchNewChanges()
            .then(changes => setCryptos(changes))
            .catch(error => console.log(error));
    }, []);

    const columns: GridColDef[] = [
        {field: 'currency', headerName: 'Currency', width: 150},
        {field: 'gain_24h', headerName: 'Gain 24h', width: 150},
        {field: 'total_wallet', headerName: 'Total wallet', width: 150},
        {field: 'total', headerName: '+/- Total', width: 150},
    ];

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={convertRows(cryptos)}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}
