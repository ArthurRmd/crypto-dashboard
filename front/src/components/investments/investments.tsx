import React, {useEffect, useState} from "react";
import {InvestmentsService} from "../../services/investments_service";
import {InvestmentDataDo} from "../../models/do/investment";
import {TokenService} from "../../services/token_service";
import {Toaster} from "../toaster";
import {DataGrid, GridColDef} from '@mui/x-data-grid';


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
            change_last_24h: crypto.change_percent_24h,
            last_updated: crypto.updated_at,
            created_at: investment.created_at,
        });
    }
    return rows;
}

export function InvestmentsComponent({investmentsService}: InvestmentsComponentProps) {

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
        {field: 'symbol', headerName: 'Symbol', width: 150},
        {field: 'name', headerName: 'Name', width: 150},
        {field: 'price_usd', headerName: 'Prise USD ($)', width: 150},
        {field: 'change_last_24h', headerName: 'Change in last 24h (%)', width: 150},
        {field: 'created_at', headerName: 'Created At', width: 200},
        {field: 'last_updated', headerName: 'Last updated', width: 200},
    ];

    if (!isAuthenticated) {
        return (
            <Toaster default_open={true} severity={"error"} message={"You must be connected !"}/>
        );
    }

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={convertRows(investments)}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}
