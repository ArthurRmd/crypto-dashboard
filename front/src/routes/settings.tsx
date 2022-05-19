import React from 'react';
import ProfileComponent from "../components/user/profile";
import SettingsForm from "../components/user/settings";

export default function SettingsRoute() {
    return (
        <div>
            <ProfileComponent/>
            <SettingsForm/>
        </div>
    );
}
