import axios from "axios";
import {
    BEARER,
    SERVER_SETTINGS_FOREX_ROUTE,
    SERVER_SETTINGS_FOREX_UPDATE_ROUTE,
    SERVER_SETTINGS_LANGS_ROUTE,
    SERVER_SETTINGS_LANGS_UPDATE_ROUTE
} from "./api_routes";
import {ForexCurrencySettingsDo, LangSettingsDo} from "../models/do/settings";

export class SettingsService {

    public static create(): SettingsService {
        return new SettingsService();
    }

    public async updateLang(token: string, lang: LangSettingsDo): Promise<void> {
        return await axios.post(
            SERVER_SETTINGS_LANGS_UPDATE_ROUTE,
            lang,
            {headers: {'Authorization': BEARER + token,}}
        )
            .then((response) => {
                const status = response.status;
                if (status === 201) {
                    return Promise.resolve(response.data);
                }

                throw new Error('Failed to update langs for user');
            })
            .catch((error) => {
                console.log(error);
                throw new Error('Failed to contact server. Please refresh your client.');
            });
    }

    public async fetchLangs(): Promise<string[]> {
        return await axios.get<string[]>(SERVER_SETTINGS_LANGS_ROUTE)
            .then((response) => {
                const status = response.status;
                if (status === 200) {
                    return Promise.resolve(response.data);
                }
                throw new Error('Failed to fetch langs');
            })
            .catch((error) => {
                console.log(error);
                throw new Error('Failed to contact server. Please refresh your client.');
            })

    }

    public async updateForexCurrency(token: string, currency: ForexCurrencySettingsDo): Promise<void> {
        return await axios.post(
            SERVER_SETTINGS_FOREX_UPDATE_ROUTE,
            currency,
            {headers: {'Authorization': BEARER + token,}}
        )
            .then((response) => {
                const status = response.status;
                if (status === 201) {
                    return Promise.resolve(response.data);
                }

                throw new Error('Failed to update currency for user');
            })
            .catch((error) => {
                console.log(error);
                throw new Error('Failed to contact server. Please refresh your client.');
            });
    }

    public async fetchForexCurrencies(): Promise<string[]> {
        return await axios.get<string[]>(SERVER_SETTINGS_FOREX_ROUTE)
            .then((response) => {
                const status = response.status;
                if (status === 200) {
                    return Promise.resolve(response.data);
                }
                throw new Error('Failed to fetch forex currencies');
            })
            .catch((error) => {
                console.log(error);
                throw new Error('Failed to contact server. Please refresh your client.');
            })

    }

    private constructor() {
    }

}