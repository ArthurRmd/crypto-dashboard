import {createSlice, PayloadAction} from '@reduxjs/toolkit';

function langFrom(value: string) {
    switch (value) {
        case 'en':
            return Lang.English;
        default:
            throw  new Error('This ' + value + ' is not a correct value to build Lang enum !');
    }
}

export enum Lang {
    English = 'en',
}

export const langSlice = createSlice({
    name: 'lang',
    initialState: {
        value: Lang.English,
    },
    reducers: {
        changeLang: (state, action: PayloadAction<string>) => {
            state.value = langFrom(action.payload);
        }
    }
})

export const {changeLang} = langSlice.actions;

export default langSlice.reducer;
