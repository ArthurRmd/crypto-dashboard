import {Route, Routes} from "react-router-dom";
import App from "../App";
import DashBoardRoute from "./dashboard";
import InvestmentsRoute from "./investments";
import RegisterRoute from "./register";
import LoginRoute from "./login";
import LogoutRoute from "./logout";
import ProfileRoute from "./profile";
import React from "react";

export const HOME_ROUTE = "/";
export const DASHBOARD_ROUTE = "dashboard";
export const INVESTMENTS_ROUTE = "investments";
export const REGISTER_ROUTE = "register";
export const SIGN_IN_ROUTE = "sign-in";
export const LOG_OUT_ROUTE = "log-out";
export const PROFILE_ROUTE = "profile";

export function CryptoDashBoardRouter() {
    return <Routes>
        <Route path={HOME_ROUTE} element={<App/>}/>
        <Route path={DASHBOARD_ROUTE} element={<DashBoardRoute/>}/>
        <Route path={INVESTMENTS_ROUTE} element={<InvestmentsRoute/>}/>
        <Route path={REGISTER_ROUTE} element={<RegisterRoute/>}/>
        <Route path={SIGN_IN_ROUTE} element={<LoginRoute/>}/>
        <Route path={LOG_OUT_ROUTE} element={<LogoutRoute/>}/>
        <Route path={PROFILE_ROUTE} element={<ProfileRoute/>}/>
    </Routes>;
}