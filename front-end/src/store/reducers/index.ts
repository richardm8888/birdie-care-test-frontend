import { combineReducers } from 'redux';
import visitsReducer from '../visits/reducer';
import { VisitState } from '../visits/types';

export const rootReducer = combineReducers({
    visits: visitsReducer,
});
  
export type RootState = ReturnType<typeof rootReducer>;

export interface StateType {
    visits: VisitState;
}
