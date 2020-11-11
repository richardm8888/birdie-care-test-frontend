import { GET_ACTIONS, GetVisitsAction } from './types';

export function getVisits(dateFrom: string, dateTo: string): GetVisitsAction {
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

export function getVisitCalendar(dateFrom: string, dateTo: string): GetVisitsAction {
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
