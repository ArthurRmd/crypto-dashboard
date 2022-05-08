import {createSlice} from '@reduxjs/toolkit';

export class ProfileProps {
    private _name: string;
    private _email: string;

    public static empty(): ProfileProps {
        return new ProfileProps("", "");
    }

    public constructor(name: string, email: string) {
        this._name = name;
        this._email = email;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        value: ProfileProps.empty(),
    },
    reducers: {
        purge: (state) => {
            state.value = ProfileProps.empty()
        },
        update: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const {update, purge} = profileSlice.actions;

export default profileSlice.reducer;
