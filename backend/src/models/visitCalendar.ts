import connection from './db';

export type VisitCalendarResponse = {
    status: number;
    message: {
        error?: Error;
        visit_calendar?: VisitCalendarType[];
    }
};

type Error = {
    code: string;
    message: string;
}

type VisitCalendarType = {
    date: Date;
    n_visits: number;
};

export default class VisitCalendar {
    static getErrorResponse(query_error: any): VisitCalendarResponse {
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

    static getSuccessResponse(visitCalendar: VisitCalendarType[]): VisitCalendarResponse {
        return {
            status: 200,
            message: {
                visit_calendar: visitCalendar
            }
        };
    }

    static getVisitCalendar(from_date: string, to_date: string, recipient_id: string) {
        return new Promise(function(resolve: (value: VisitCalendarResponse) => any) {
            connection.query(
                `
                SELECT DATE(timestamp) AS "date", COUNT(distinct(visit_id)) AS "n_visits"
                FROM events
                WHERE visit_id IS NOT NULL
                AND DATE(events.timestamp) BETWEEN ? and ?
                AND care_recipient_id = ?
                GROUP BY
                    DATE(timestamp)
                `,
                [from_date, to_date, recipient_id], 
                function (query_error:any, query_results:VisitCalendarType[]) {             
                    if(query_error) {
                        resolve(VisitCalendar.getErrorResponse(query_error));
                    }
                    else {
                        resolve(VisitCalendar.getSuccessResponse(query_results));      
                    }
                }
            ); 
        });
    }
}
