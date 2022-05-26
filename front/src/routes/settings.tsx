import React from 'react';
import ProfileComponent from "../components/user/profile";
import SettingsForm from "../components/user/settings";
import {SettingsService} from "../services/settings_service";
import {UserService} from "../services/user_service";

export default function SettingsRoute() {
    const settingsService = SettingsService.create();
    const userService = UserService.create();
    return (
        <div>
            <ProfileComponent/>
            <SettingsForm settingsService={settingsService} userService={userService}/>
        </div>
    );
}
