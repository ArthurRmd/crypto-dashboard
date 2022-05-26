import React from 'react';
import {InvestmentsService} from "../services/investments_service";
import {InvestmentsComponent} from "../components/investments/investments";
import ProfileComponent from "../components/user/profile";
import {InvestmentsForm} from "../components/investments/investments_form";

export default function InvestmentsRoute() {
    const investmentsService = InvestmentsService.create();
    return (
        <div>
            <h1> My Investments </h1>
            <InvestmentsComponent investmentsService={investmentsService}/>

            <br/>
            <h2> Create Investment</h2>
            <InvestmentsForm investmentsService={investmentsService}/>
        </div>
    );
}
