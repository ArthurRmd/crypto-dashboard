import React, {useEffect, useState} from "react";
import {InvestmentsService} from "../../services/investments_service";
import {InvestmentDataDo} from "../../models/do/investment";
import {TokenService} from "../../services/token_service";
import {Toaster} from "../toaster";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useSelector} from "react-redux";
import {Container, Grid} from "@mui/material";

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
import {faker} from "@faker-js/faker";

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


export interface InvestmentsComponentProps {
    investmentsService: InvestmentsService;
}

function convertRows(investments: InvestmentDataDo[]) {
    const rows = [];
    for (const key in investments) {
        const investment = investments[key];
        const crypto = investment.crypto;
        rows.push({
            id: key,
            symbol: crypto.symbol,
            name: crypto.name,
            price_usd: crypto.price_usd,
            price_forex: crypto.price_forex,
            change_last_24h: crypto.change_percent_24h,
            last_updated: crypto.updated_at,
            created_at: investment.created_at,
        });
    }
    return rows;
}

export function InvestmentsComponent({investmentsService}: InvestmentsComponentProps) {

    const forex_currency: string = useSelector((state: any) => state.forex.value);
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [investments, setInvestments] = useState<InvestmentDataDo[]>([]);

    useEffect(() => {
        try {
            investmentsService.fetchInvestments(TokenService.getToken())
                .then(investments => {
                    setInvestments(investments.data)
                })
                .catch(error => console.log(error));
            setAuthenticated(true);
        } catch (e) {
            setAuthenticated(false);
        }
    }, []);

    const columns: GridColDef[] = [
        {field: 'symbol', headerName: 'Symbol', width: 50},
        {field: 'name', headerName: 'Name', width: 150},
        {field: 'price_usd', headerName: 'Price USD ($)', width: 150},
        {field: 'price_forex', headerName: 'Price Forex (' + forex_currency + ')', width: 200},
        {field: 'change_last_24h', headerName: 'Change in last 24h (%)', width: 200},
        {field: 'created_at', headerName: 'Created At', width: 200},
        {field: 'last_updated', headerName: 'Last updated', width: 200},
    ];

    if (!isAuthenticated) {
        return (
            <Toaster default_open={true} severity={"error"} message={"You must be connected !"}/>
        );
    }

    const data = {
        labels: ['BTC', 'ETH', 'MONERO', 'LUNA', 'XPI', 'BNB'],
        datasets: [
            {
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    '#FFA',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data2 = {
        labels,
        datasets: [
            {
                label: 'Evolution Investments',
                data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    console.log(data2)

    return (
        <div>
            <Grid container spacing={2} style={{marginBottom:30}}>
                <Grid item xs={4}>
                    <Doughnut data={data}/>
                </Grid>
                <Grid item xs={8}>
                    <Line options={options} data={data2} />
                </Grid>

            </Grid>

            <div style={{height: 420, width: '100%'}}>

                <DataGrid
                    rows={convertRows(investments)}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
        </div>

    );
}
