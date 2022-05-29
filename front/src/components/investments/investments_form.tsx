import Box from "@mui/material/Box";
import React, { useState, } from "react";
import { InvestmentsService } from "../../services/investments_service";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { InputAdornment, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import { TokenService } from "../../services/token_service";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { Toaster } from "../toaster";


export interface InvestmentsFormProps {
  investmentsService: InvestmentsService;
}

export function InvestmentsForm({ investmentsService }: InvestmentsFormProps) {
  const isLogged: boolean = useSelector((state: any) => state.loger.value);
  const [cryptoToBuy, setCryptoToBuy] = useState("");
  const [amountCrypto, setAmountCrypto] = useState(0);

  function handleChangeCryptoChoice(event: SelectChangeEvent) {
    setCryptoToBuy(event.target.value);
  }

  function handleChangeCryptoAmount(event: React.ChangeEvent<HTMLInputElement>) {
    setAmountCrypto(Number.parseFloat(event.target.value));
  }

  function handleSubmit() {
    investmentsService.buyCrypto(TokenService.getToken(), { price_usd: amountCrypto }, cryptoToBuy)
      .then(response => {

      }).catch(error => {
      });
  }

  const handleToastClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
  };

  if (!isLogged) {
    return (
      <Toaster
        open={true}
        severity={"error"}
        message={"You must be connected !"}
        handleClose={handleToastClose}
      />
    );
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl sx={{ m: 2, minWidth: 450 }}>
        <InputLabel id="label-buy-crypto">Age</InputLabel>
        <Select
          labelId="label-buy-crypto"
          id="demo-simple-select"
          value={cryptoToBuy}
          label="Crypto to buy"
          fullWidth={true}
          onChange={handleChangeCryptoChoice}
        >
          <MenuItem value="1">BTC</MenuItem>
          <MenuItem value="2">ETH</MenuItem>
        </Select>

        <TextField
          style={{ width: '100%', margin: '10px 0' }}
          required
          id="outlined-required"
          label="Amount"
          onChange={handleChangeCryptoAmount}
        />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          BUY NOW
        </Button>
      </FormControl>



    </Box>

  );
}
