import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './state/loginSlice';

export default configureStore({
  reducer: {
    loger: loginReducer,
  },
})
