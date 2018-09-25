import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import { epic as counterEpic, reducer as counterReducer } from './counter';
import { reducer as statusReducer } from './status';
import { reducer as messageReducer } from './message';
import thunkMiddleware from 'redux-thunk';
import { AppActions, AppEpic, AppState } from './types';

// ------------------------------------------------------------------------------------------------
// Model
// ------------------------------------------------------------------------------------------------

export interface State {
  message: string | null;
}

// ------------------------------------------------------------------------------------------------
// Epics
// ------------------------------------------------------------------------------------------------

export const rootEpic: AppEpic<AppActions> = combineEpics(counterEpic);

// ------------------------------------------------------------------------------------------------
// Reducer
// ------------------------------------------------------------------------------------------------

export const rootReducer = combineReducers({
  message: messageReducer,
  counter: counterReducer,
  status: statusReducer,
});

export function createAppStore() {
  const epicMiddleware = createEpicMiddleware<AppActions, AppActions, AppState, void>();
  const middlewareEnhancer = applyMiddleware(thunkMiddleware, epicMiddleware);
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, composeEnhancers(middlewareEnhancer));

  epicMiddleware.run(rootEpic);
  return store;
}
