export const BEARER = 'Bearer ';
const BASE_API: string = 'http://localhost:8000/api';
// const BASE_API: string = 'https://4b3b-77-141-64-64.ngrok.io/api';

export const SERVER_FETCH_NEW_CHANGES: string = BASE_API + '/cryptos';

// User
export const SERVER_REGISTER_ROUTE: string = BASE_API + '/users/register';
export const SERVER_LOGIN_ROUTE: string = BASE_API + '/users/login';
export const SERVER_USER_UPDATE_ROUTE: string = BASE_API + '/users';

// Investments
export const SERVER_INVESTMENTS_ROUTE: string = BASE_API + '/investments';
export const SERVER_INVESTMENT_BUY_ROUTE: string = BASE_API + '/investments/{crypto}';
export const SERVER_INVESTMENT_DELETE_ROUTE: string = BASE_API + '/investments/{crypto}';

// Settings
// Lang
export const SERVER_SETTINGS_LANGS_ROUTE: string = BASE_API + '/languages';
export const SERVER_SETTINGS_LANGS_UPDATE_ROUTE: string = BASE_API + '/languages/change';

// Forex currency
export const SERVER_SETTINGS_FOREX_ROUTE: string = BASE_API + '/forex-currencies';
export const SERVER_SETTINGS_FOREX_UPDATE_ROUTE: string = BASE_API + '/forex-currencies/change';
