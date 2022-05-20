const BASE_API: string = 'http://localhost:8000/api';
// const BASE_API: string = 'https://312b-77-141-64-64.ngrok.io/api';

export const SERVER_FETCH_NEW_CHANGES: string = BASE_API + '/cryptos';

// User
export const SERVER_REGISTER_ROUTE: string = BASE_API + '/users/register';
export const SERVER_LOGIN_ROUTE: string = BASE_API + '/users/login';

// Investments

export const SERVER_INVESTMENTS_ROUTE: string = BASE_API + '/investments';
export const SERVER_INVESTMENT_BUY_ROUTE: string = BASE_API + '/investments/{crypto}';

