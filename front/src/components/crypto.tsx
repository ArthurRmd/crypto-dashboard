import React, {useEffect, useState} from "react";
import {CryptoService} from "../services/crypto_service";
import {CryptoDataDo, CryptoDatasetDo, DashBoardCryptDataDo} from "../models/do/dashboard_crypto";

import {Container, Grid} from "@mui/material";
import {DataGrid, GridColDef} from '@mui/x-data-grid';

import {TokenService} from "../services/token_service";
import {faker} from '@faker-js/faker';

import {Doughnut, Line} from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Toaster, defaultHandleToastClose } from "./toaster";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

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
    const [cryptosData, setCryptosData] = useState<CryptoDataDo[]>([]);
    const [months, setMonths] = useState<string[]>([]);
    const isLogged: boolean = useSelector((state: any) => state.loger.value);
  const { t } = useTranslation();

    useEffect(() => {
        if (isLogged) {
            cryptoService.fetchNewChanges(TokenService.getToken())
                .then(changes => {
                    setCryptos(changes);
                })
                .catch(error => {
                    console.log(error);
                });

            cryptoService.getStatistics(TokenService.getToken())
                .then(statistics => {
                    setMonths(statistics.months)
                    setCryptosData(statistics.data)
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, []);

    if (!isLogged) {
    return (
      <Toaster
        open={true}
        severity={"error"}
        message={t('general.connection.not_connected')}
        handleClose={defaultHandleToastClose }
      />
        );
    }


    const columns: GridColDef[] = [
        {field: 'currency', headerName: 'Currency', width: 150},
        {field: 'symbol', headerName: 'Symbol', width: 150},
        {field: 'price_usd', headerName: 'Price USD ($)', width: 150},
        {field: 'change_percent_24h', headerName: 'Change last 24h (%)', width: 150},
    ];


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Top 10 Cryptos',
            },
        },
    };

    const labels = months;
    let dataset:CryptoDatasetDo[] = [];
    cryptosData.forEach(cryptoData => {
        dataset.push({
            label: cryptoData.name,
            data: cryptoData.values,
            borderColor: cryptoData.color,
            backgroundColor: cryptoData.color,
        })
    })

    const data = {
        labels,
        datasets: dataset,
    };


    return (
        <div style={{height: 400, width: '100%'}}>

            <h1 style={{marginBottom: 20}}> Dashboard</h1>

            <Container maxWidth="md">
                <Line options={options} data={data}/>
            </Container>

            <DataGrid
                style={{marginTop: 60}}
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
