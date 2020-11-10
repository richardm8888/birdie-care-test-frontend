import {
    GET_ACTIONS, VisitState, GetVisitsAction
} from './types';

export const visitsState: VisitState = {
    visits: []
};

export default function visitsReducer(state = visitsState, action: GetVisitsAction) {
    switch (action.type) {
        case GET_ACTIONS.GET_VISITS_SUCCESS:
            return {
                ...state,
                visits: [],
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
