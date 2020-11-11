import {
    GET_ACTIONS, Visits, GetVisitsSuccessAction
} from './types';

export const visitsState: Visits = {
    visits: []
};

export default function visitsReducer(state: Visits = visitsState, action: GetVisitsSuccessAction) {
    switch (action.type) {
        case GET_ACTIONS.GET_VISITS_SUCCESS:
            return {
                ...state,
                visits: action.payload.data.visits,
            };
        case GET_ACTIONS.GET_VISITS_FAIL:
            return {
                ...state,
                visits: [],
            };
        default:
            return state;
    }
}
