import { GET_ACTIONS, GetVisitsAction } from './types';

export function getVisits(dateFrom: Date, dateTo: Date): GetVisitsAction {
    return {
        type: GET_ACTIONS.GET_VISITS,
        payload: {
            request: {
                method: 'GET',
                url: `localhost:8000/visits?date_from=${dateFrom.toString()}&date_to=${dateTo}`
            },
        },
    };
  }
