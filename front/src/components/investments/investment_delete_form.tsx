import { Button } from '@mui/material';
import React from 'react';
import { InvestmentDataDo } from '../../models/do/investment';
import { InvestmentsService } from '../../services/investments_service';
import { TokenService } from '../../services/token_service';

export interface InvestmentDeleteFormProps {
  investmentService: InvestmentsService;
  investment: InvestmentDataDo;
}

export default function InvestmentDeleteForm({ investmentService, investment }: InvestmentDeleteFormProps) {

  function deleteInv() {
    // @TODO add confirmation
    investmentService.deleteInvestment(
      TokenService.getToken(),
      investment.crypto.id
    )
  }

  return (
    <Button onClick={deleteInv}>x</Button>
  );
}

