import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CryptoService } from "../../services/crypto_service";
import { DashBoardCryptDo } from "../../models/do/dashboard_crypto";

export interface RecentChangeComponentProps {
  cryptoService: CryptoService;
}

export default function RecentChangeComponent({ cryptoService }: RecentChangeComponentProps) {

  const [cryptos, setCryptos] = useState<DashBoardCryptDo[]>([]);


  useEffect(() => {
    cryptoService.fetchNewChanges()
      .then(changes => {
        setCryptos(changes);
      })
      .catch(error => console.log(error));
  }, []);

  const headers = ["Currency", "24h", "Total wallet", "+/- Total"];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" >
        <TableHead>
          <TableRow>
            {headers.map((header) => <TableCell> {header} </TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {cryptos.map((crypto) => (
            <TableRow
              key={crypto.getCurrencyName()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{crypto.getCurrencyName()}</TableCell>
              <TableCell>{crypto.getGainLast24Hours()}</TableCell>
              <TableCell>{crypto.getTotalWallet()}</TableCell>
              <TableCell>{crypto.getTotalWalletDifference()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </TableContainer>
  );
}
