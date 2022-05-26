import axios from "axios";
import {SERVER_SETTINGS_LANGS_ROUTE} from "./api_routes";

export class SettingsService {

    public static create(): SettingsService {
        return new SettingsService();
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

    private constructor() {
    }

}