import React from 'react';
import {InvestmentsService} from "../services/investments_service";
import {InvestmentsComponent} from "../components/investments/investments";
import {InvestmentsForm} from "../components/investments/investments_form";

export default function InvestmentsRoute() {
    const investmentsService = InvestmentsService.create();
    return (
        <div>
            <h1 style={{marginBottom:30}}> My Investments </h1>
            <InvestmentsComponent investmentsService={investmentsService}/>

            <h2 style={{marginTop:40}}> Create Investment</h2>
            <InvestmentsForm investmentsService={investmentsService}/>
        </div>
    );
}
