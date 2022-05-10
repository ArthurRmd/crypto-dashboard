import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './state/loginSlice';
import profileReducer from "./state/profileSlice";

export default configureStore({
    reducer: {
        loger: loginReducer,
        account: profileReducer,
    },
})
