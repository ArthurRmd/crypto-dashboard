import React from 'react';
import {InvestmentsService} from "../services/investments_service";
import {InvestmentsComponent} from "../components/investments";

export default function InvestmentsRoute() {
    const investmentsService = InvestmentsService.create();
    return (<InvestmentsComponent investmentsService={investmentsService}/>);
}
