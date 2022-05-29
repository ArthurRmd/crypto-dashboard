import React, { useEffect, useState } from "react";
import { CryptoService } from "../services/crypto_service";
import { DashBoardCryptDataDo } from "../models/do/dashboard_crypto";

import { Container, Grid } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { TokenService } from "../services/token_service";
import { faker } from '@faker-js/faker';

import { Doughnut, Line } from 'react-chartjs-2';

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

export default function CryptoComponent({ cryptoService }: CryptoComponentProps) {

  const [cryptos, setCryptos] = useState<DashBoardCryptDataDo[]>([]);
  const isLogged: boolean = useSelector((state: any) => state.loger.value);

  useEffect(() => {
    if (isLogged) {
      cryptoService.fetchNewChanges(TokenService.getToken())
        .then(changes => {
          setCryptos(changes);
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
        message={"You must be connected !"}
        handleClose={defaultHandleToastClose }
      />
    );
  }


  const columns: GridColDef[] = [
    { field: 'currency', headerName: 'Currency', width: 150 },
    { field: 'symbol', headerName: 'Symbol', width: 150 },
    { field: 'price_usd', headerName: 'Price USD ($)', width: 150 },
    { field: 'change_percent_24h', headerName: 'Change last 24h (%)', width: 150 },
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

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data2 = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  console.log(data2)

  return (
    <div style={{ height: 400, width: '100%' }}>

      <h1 style={{ marginBottom: 20 }}> Dashboard</h1>

      <Container maxWidth="md">
        <Line options={options} data={data2} />
      </Container>

      <DataGrid
        style={{ marginTop: 60 }}
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
