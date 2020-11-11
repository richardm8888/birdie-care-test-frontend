import { GET_ACTIONS, GetVisitsAction } from './types';

export function getVisits(dateFrom: Date, dateTo: Date): GetVisitsAction {
    return {
        type: GET_ACTIONS.GET_VISITS,
        payload: {
            request: {
                method: 'GET',
                url: `/visits?from_date=${dateFrom.toJSON()}&to_date=${dateTo.toJSON()}`
            },
        },
    };
  }
