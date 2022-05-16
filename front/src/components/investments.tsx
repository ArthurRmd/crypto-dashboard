import React, {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {InvestmentsService} from "../services/investments_service";
import {InvestmentDataDo} from "../models/do/investment";
import {TokenService} from "../services/token_service";


export interface InvestmentsComponentProps {
    investmentsService: InvestmentsService;
}

export function InvestmentsComponent({investmentsService}: InvestmentsComponentProps) {

    const [investments, setInvestments] = useState<InvestmentDataDo[]>([]);

    useEffect(() => {
        investmentsService.fetchInvestments(TokenService.getToken())
            .then(investments => {
                setInvestments(investments.data)
            })
            .catch(error => console.log(error));
    }, []);

    const headers = ["Symbol", "Name", "Prise USD ($)", "Change in last 24h (%)", "Last updated"];

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers.map((header) => <TableCell> {header} </TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {investments.map((investment) => {
                        const crypto = investment.crypto;
                        return (<TableRow
                                key={crypto.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell>{crypto.symbol}</TableCell>
                                <TableCell>{crypto.name}</TableCell>
                                <TableCell>{crypto.price_usd}</TableCell>
                                <TableCell>{crypto.change_percent_24h}</TableCell>
                                <TableCell>{crypto.updated_at}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

        </TableContainer>
    );
}
