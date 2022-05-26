import React from 'react';
import ProfileComponent from "../components/user/profile";
import SettingsForm from "../components/user/settings";
import {SettingsService} from "../services/settings_service";

export default function SettingsRoute() {
    const settingsService = SettingsService.create();
    return (
        <div>
            <ProfileComponent/>
            <SettingsForm settingsService={settingsService}/>
        </div>
    );
}
