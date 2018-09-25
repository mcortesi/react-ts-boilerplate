import { Actions as StatusActions, State as StatusState } from './status';
import { Actions as MessageActions, State as MessageState } from './message';
import { Actions as CounterActions, State as CounterState } from './counter';
import { Epic } from 'redux-observable';

export type AppActions = StatusActions | MessageActions | CounterActions;

export type AppReducer<S> = (state: undefined | S, action: AppActions) => S;

export interface AppState {
  message: MessageState;
  status: StatusState;
  counter: CounterState;
}

export type AppEpic<A extends AppActions> = Epic<AppActions, A, AppState, void>;
