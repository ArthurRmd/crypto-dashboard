import {createSlice, PayloadAction} from '@reduxjs/toolkit';

function empty(): ProfileProps {
    return {name: "", email: ""};
}

export interface ProfileProps {
    name: string;
    email: string;
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        value: empty(),
    },
    reducers: {
        purge: (state) => {
            state.value = empty();
        },
        update: (state, action: PayloadAction<ProfileProps>) => {
            state.value = action.payload;
        },
    }
})

export const {update, purge} = profileSlice.actions;

export default profileSlice.reducer;
