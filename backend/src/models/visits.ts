import connection from './db';

export type VisitsResponse = {
    status: number;
    message: {
        error?: Error;
        visits?: Visit[];
    }
};

type Error = {
    code: string;
    message: string;
}

type Visit = {
    visit_id: string;
    start_timestamp: Date;
    end_timestamp: Date;
    n_events: number;
    events: any[]
};

export default class Visits {
    static getErrorResponse(query_error: any): VisitsResponse {
        return {
            status: 400,
            message: {
                error: {
                    "code": query_error.code,
                    "message": query_error.sqlMessage
                }
            }
        };
    }

    static getSuccessResponse(visits: Visit[]): VisitsResponse {
        return {
            status: 200,
            message: {
                visits: visits
            }
        };
    }

    static convertResultsToResponseFormat(query_results: any): Visit[] {
        let visits: Visit[] = [];
        query_results.forEach((visit: any) => {
            visits.push({
                "visit_id": visit.visit_id,
                "start_timestamp": visit.start_timestamp,
                "end_timestamp": visit.end_timestamp,
                "n_events": visit.n_events,
                "events": JSON.parse(visit.events)
            });
        });
        return visits;
    }

    static getVisits(from_date: string, to_date: string, recipient_id: string) {
        return new Promise(function(resolve: (value: VisitsResponse) => any) {
            connection.query(
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
                [from_date, to_date, recipient_id], 
                function (query_error:any, query_results:any) {             
                    if(query_error) {
                        resolve(Visits.getErrorResponse(query_error));
                    }
                    else {
                        const visits = Visits.convertResultsToResponseFormat(query_results);
                        resolve(Visits.getSuccessResponse(visits));      
                    }
                }
            ); 
        });
    }
}
