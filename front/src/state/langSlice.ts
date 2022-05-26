import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const langSlice = createSlice({
    name: 'lang',
    initialState: {
        value: 'english',
    },
    reducers: {
        changeLang: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    }
})

export const {changeLang} = langSlice.actions;

export default langSlice.reducer;
