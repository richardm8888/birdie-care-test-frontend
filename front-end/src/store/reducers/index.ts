import { combineReducers } from 'redux';
import visitsReducer from '../visits/reducer';

export type RootState = Readonly<{}>;

export const rootReducer = combineReducers<RootState>({
    visits: visitsReducer,
});
