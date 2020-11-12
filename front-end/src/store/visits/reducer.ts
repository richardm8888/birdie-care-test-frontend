import {
    GET_ACTIONS, VisitState, ActionTypes
} from './types';

export const visitsState: VisitState = {
    visits: [],
    visit_calendar: [],
    current_visit: null,
    current_date: null,
};

export default function visitsReducer(state: VisitState = visitsState, action: ActionTypes): VisitState {
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
        case GET_ACTIONS.GET_VISIT_CALENDAR_SUCCESS:
            return {
                ...state,
                visit_calendar: action.payload.data.visit_calendar,
            };
        case GET_ACTIONS.SET_DATE:
            return {
                ...state,
                current_date: action.date,
            };
        case GET_ACTIONS.SET_VISIT:
            return {
                ...state,
                current_visit: action.visit,
            };
        default:
            return state;
    }
}
