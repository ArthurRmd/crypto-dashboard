import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { InvestmentDataDo } from '../../models/do/investment';
import { InvestmentsService } from '../../services/investments_service';
import InvestmentDeleteForm from './investment_delete_form';

export interface InvestmentRowGridProps {
  investmentService: InvestmentsService;
  investment: InvestmentDataDo;
}

export default function InvestmentRowGrid({ investmentService, investment }: InvestmentRowGridProps) {
  const crypto = investment.crypto;
  return (
    <TableRow>
      <TableCell>{crypto.symbol}</TableCell>
      <TableCell>{crypto.name}</TableCell>
      <TableCell>{crypto.price_usd}</TableCell>
      <TableCell>{crypto.price_forex}</TableCell>
      <TableCell>{crypto.change_percent_24h}</TableCell>
      <TableCell>{investment.created_at}</TableCell>
      <TableCell>{crypto.updated_at}</TableCell>
      <TableCell>
        <InvestmentDeleteForm investment={investment} investmentService={investmentService} />
      </TableCell>
    </TableRow>
  );
}
