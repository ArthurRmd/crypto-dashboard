import React, { useEffect, useState } from "react";
import { InvestmentsService } from "../../services/investments_service";
import { InvestmentDataDo } from "../../models/do/investment";
import { TokenService } from "../../services/token_service";
import { Toaster, defaultHandleToastClose } from "../toaster";
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Box from '@mui/material/Box';
import { useSelector } from "react-redux";
import HeadersRow from "./headers";
import InvestmentRowGrid from "./investment_row";
import { Grid } from "@mui/material";
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
import { faker } from "@faker-js/faker";

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

export function InvestmentsComponent({ investmentsService }: InvestmentsComponentProps) {

  const forex_currency: string = useSelector((state: any) => state.forex.value);
  const isLogged: boolean = useSelector((state: any) => state.loger.value);
  const [investments, setInvestments] = useState<InvestmentDataDo[]>([]);


  useEffect(() => {
    if (isLogged) {
      investmentsService.fetchInvestments(TokenService.getToken())
        .then(investments => {
          setInvestments(investments.data)
        })
        .catch(error => console.log(error));
    }
  }, []);

  if (!isLogged) {
    return (
      <Toaster
        open={true}
        severity={"error"}
        message={"You must be connected !"}
        handleClose={defaultHandleToastClose}
      />
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


  const headers: string[] = [
    'Symbol',
    'Name',
    'Price USD ($)',
    'Price Forex (' + forex_currency + ')',
    'Change in last 24h (%)',
    'Created At',
    'Last updated',
    'Delete',
  ];


  return (
    <Box>
      <h1 style={{marginBottom:30}}> My Investments </h1>
      <Box>
        <Grid container spacing={2} style={{ marginBottom: 30 }}>
          <Grid item xs={4}>
            <Doughnut data={data} />
          </Grid>
          <Grid item xs={8}>
            <Line options={options} data={data2} />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Table aria-label="simple table">
          <TableHead>
            <HeadersRow headers={headers} />
          </TableHead>
          <TableBody>
            {investments.map(inv => <InvestmentRowGrid key={inv.crypto.id} investment={inv} investmentService={investmentsService} />)}
          </TableBody>
        </Table>
      </Box>

    </Box>
  );
}
