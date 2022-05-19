import React from 'react';
import {InvestmentsService} from "../services/investments_service";
import {InvestmentsComponent} from "../components/investments/investments";
import ProfileComponent from "../components/user/profile";
import {InvestmentsForm} from "../components/investments/investments_form";

export default function InvestmentsRoute() {
    const investmentsService = InvestmentsService.create();
    return (
        <div>
            <ProfileComponent/>
            <InvestmentsComponent investmentsService={investmentsService}/>
            <InvestmentsForm investmentsService={investmentsService}/>
        </div>
    );
}
