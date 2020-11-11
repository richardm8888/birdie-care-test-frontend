import { GET_ACTIONS, ActionTypes } from './types';

export function setDate(date: moment.Moment) {
    return {
        type: GET_ACTIONS.SET_DATE,
        payload: {
            date
        }
    };
}


export function getVisits(dateFrom: string, dateTo: string): ActionTypes {
    return {
        type: GET_ACTIONS.GET_VISITS,
        payload: {
            request: {
                method: 'GET',
                url: `/visits?from_date=${dateFrom}&to_date=${dateTo}`
            },
        },
    };
}

export function getVisitCalendar(dateFrom: string, dateTo: string): ActionTypes {
    return {
        type: GET_ACTIONS.GET_VISIT_CALENDAR,
        payload: {
            request: {
                method: 'GET',
                url: `/visit-calendar?from_date=${dateFrom}&to_date=${dateTo}`
            },
        },
    };
}
