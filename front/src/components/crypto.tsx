import React, {useEffect, useState} from "react";
import {CryptoService} from "../services/crypto_service";
import {DashBoardCryptDataDo} from "../models/do/dashboard_crypto";

import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {TokenService} from "../services/token_service";

export interface CryptoComponentProps {
    cryptoService: CryptoService;
}

function convertRows(cryptos: DashBoardCryptDataDo[]) {
    const rows = [];
    for (const key in cryptos) {
        let crypto = cryptos[key];
        rows.push({
            id: key,
            currency: crypto.name,
            symbol: crypto.symbol,
            price_usd: crypto.price_usd,
            change_percent_24h: crypto.change_percent_24h,
        });
    }
    return rows;
}

export default function CryptoComponent({cryptoService}: CryptoComponentProps) {

    const [cryptos, setCryptos] = useState<DashBoardCryptDataDo[]>([]);


    useEffect(() => {
        cryptoService.fetchNewChanges(TokenService.getToken())
            .then(changes => setCryptos(changes))
            .catch(error => console.log(error));
    }, []);

    const columns: GridColDef[] = [
        {field: 'currency', headerName: 'Currency', width: 150},
        {field: 'symbol', headerName: 'Symbol', width: 150},
        {field: 'price_usd', headerName: 'Price USD ($)', width: 150},
        {field: 'change_percent_24h', headerName: 'Change last 24h (%)', width: 150},
    ];

    return (
        <div style={{height: 400, width: '100%'}}>

            <h1> Dashboard</h1>

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
