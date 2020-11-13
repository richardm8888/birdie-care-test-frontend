import * as express from "express";
import Visits, { VisitsResponse } from '../models/visits';
import VisitCalendar, { VisitCalendarResponse } from '../models/visitCalendar';

export const visitsController = express.Router();

/*
    As i am lacking a way of identifying a patient, i've picked one at random for now
    this would come from the API request in a real-world application
*/
const RECIPIENT_ID = 'df50cac5-293c-490d-a06c-ee26796f850d';

function getDateParams(req: any) {
    const from_date = req.query.from_date;
    const to_date = req.query.to_date;

    return {from_date, to_date};
}

function getDateParamError(from_date: string, to_date: string) {
    if (!from_date || !to_date) {
        return {
            error: {
                "code": "MISSING_PARAM",
                "message": "Must provide both a `from_date` and `to_date` query parameter"
            } 
        };
    } else {
        return null;
    }
}


visitsController.get('/visits', (req, res) => {
    const {from_date, to_date} = getDateParams(req);
    const date_error = getDateParamError(from_date, to_date);
    if (date_error) {
        res.status(400).json(date_error);
        return;
    }

    Visits.getVisits(from_date, to_date, RECIPIENT_ID).then((data: VisitsResponse) => {
        res.status(data.status).json(data.message);
    });
});


visitsController.get('/visit-calendar', (req, res) => {
    const {from_date, to_date} = getDateParams(req);
    const date_error = getDateParamError(from_date, to_date);
    if (date_error) {
        res.status(400).json(date_error);
        return;
    }

    VisitCalendar.getVisitCalendar(from_date, to_date, RECIPIENT_ID).then((data: VisitCalendarResponse) => {
        res.status(data.status).json(data.message);
    });
});
