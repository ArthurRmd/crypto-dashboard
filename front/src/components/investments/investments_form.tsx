import Box from "@mui/material/Box";
import React, {useState} from "react";
import {InvestmentsService} from "../../services/investments_service";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import {Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select";
import {TokenService} from "../../services/token_service";
import TextField from "@mui/material/TextField";


export interface InvestmentsFormProps {
    investmentsService: InvestmentsService;
}

export function InvestmentsForm({investmentsService}: InvestmentsFormProps) {
    const [cryptoToBuy, setCryptoToBuy] = useState("");
    const [amountCrypto, setAmountCrypto] = useState(0);

    function handleChangeCryptoChoice(event: SelectChangeEvent) {
        setCryptoToBuy(event.target.value);
    }

    function handleChangeCryptoAmount(event: React.ChangeEvent<HTMLInputElement>) {
        setAmountCrypto(Number.parseFloat(event.target.value));
    }

    function handleSubmit() {
        investmentsService.buyCrypto(TokenService.getToken(), {price_usd: amountCrypto}, cryptoToBuy)
            .then(response => {

            }).catch(error => {
        });
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off"
        >
            <FormControl fullWidth>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cryptoToBuy}
                    label="Crypto to buy"
                    onChange={handleChangeCryptoChoice}
                >
                    <MenuItem value="1">BTC</MenuItem>
                    <MenuItem value="2">ETH</MenuItem>
                </Select>


                <TextField
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
