import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const forexSlice = createSlice({
    name: 'forex',
    initialState: {
        value: 'EUR',
    },
    reducers: {
        changeForex: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    }
})

export const {changeForex} = forexSlice.actions;

export default forexSlice.reducer;

