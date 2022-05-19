import React from 'react';
import {InvestmentsService} from "../services/investments_service";
import {InvestmentsComponent} from "../components/investments";
import ProfileComponent from "../components/user/profile";

export default function InvestmentsRoute() {
    const investmentsService = InvestmentsService.create();
    return (
        <div>
            <ProfileComponent/>
            <InvestmentsComponent investmentsService={investmentsService}/>
        </div>
    );
}
