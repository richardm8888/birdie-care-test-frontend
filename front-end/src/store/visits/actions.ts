import { GET_ACTIONS, Visit, RequestAction, setDateAction, setVisitAction } from './types';

export function setDate(date: moment.Moment): setDateAction {
    return {
        type: GET_ACTIONS.SET_DATE,
        date
    };
}

export function setVisit(visit: Visit): setVisitAction {
    return {
        type: GET_ACTIONS.SET_VISIT,
        visit
    };
}

export function getVisits(dateFrom: string, dateTo: string): RequestAction {
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

export function getVisitCalendar(dateFrom: string, dateTo: string): RequestAction {
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
