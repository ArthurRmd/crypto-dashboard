import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './state/loginSlice';
import profileReducer from "./state/profileSlice";
import langReducer from "./state/langSlice";
import forexReducer from "./state/forexSlice";

export default configureStore({
    reducer: {
        loger: loginReducer,
        account: profileReducer,
        lang: langReducer,
        forex: forexReducer,
    },
})
