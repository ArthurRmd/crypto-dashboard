import { Button } from '@mui/material';
import React from 'react';
import { InvestmentDataDo } from '../../models/do/investment';
import { InvestmentsService } from '../../services/investments_service';
import { TokenService } from '../../services/token_service';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

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
    <Tooltip title="Delete">
      <IconButton onClick={deleteInv}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}

