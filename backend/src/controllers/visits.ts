import * as express from "express";

var sql = require('../models/db.js');

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

    // TODO - Move all of this to a model
    sql.query(
        `
        SELECT 
            visit_id, 
            MIN(events.timestamp) AS start_timestamp, 
            MAX(events.timestamp) AS end_timestamp, 
            COUNT(id) AS "n_events",
            JSON_ARRAYAGG(payload) AS "events"
        FROM events
        WHERE visit_id IS NOT NULL
        AND DATE(events.timestamp) BETWEEN ? AND ?
        AND care_recipient_id = ?
        GROUP BY
            visit_id
        `,
        [from_date, to_date, RECIPIENT_ID], 
        function (query_error:any, query_results:any) {             
            if(query_error) {
                res.status(400).json({
                    error: {
                        "code": query_error.code,
                        "message": query_error.sqlMessage
                    }
                });
                return;
            }
            else {
                // TODO - Create a transformer to convert results to api response format
                let visits: any[] = [];
                query_results.forEach((visit: any) => {
                    visits.push({
                        "visit_id": visit.visit_id,
                        "start_timestamp": visit.start_timestamp,
                        "end_timestamp": visit.end_timestamp,
                        "n_events": visit.n_events,
                        "events": JSON.parse(visit.events)
                    });
                })
                res.status(200).json({"visits": visits});   
                return;         
            }
        }
    );    
});


visitsController.get('/visit-calendar', (req, res) => {
    const {from_date, to_date} = getDateParams(req);
    const date_error = getDateParamError(from_date, to_date);
    if (date_error) {
        res.status(400).json(date_error);
        return;
    }

    // TODO - Move all of this to a model
    sql.query(
        `
            SELECT DATE(timestamp) AS "date", COUNT(distinct(visit_id)) AS "n_visits"
            FROM events
            WHERE visit_id IS NOT NULL
            AND DATE(events.timestamp) BETWEEN ? and ?
            AND care_recipient_id = ?
            GROUP BY
                DATE(timestamp)
        `,
        [from_date, to_date, RECIPIENT_ID], 
        function (query_error:any, query_results:any) {             
            if(query_error) {
                res.status(400).json({
                    error: {
                        "code": query_error.code,
                        "message": query_error.sqlMessage
                    }
                });
                return;
            }
            else {
                res.status(200).json({"visit_calendar": query_results});   
                return;         
            }
        }
    );   
});
