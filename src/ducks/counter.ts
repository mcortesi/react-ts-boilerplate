import { interval } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { AppEpic, AppReducer } from './types';

// ------------------------------------------------------------------------------------------------
// Actions
// ------------------------------------------------------------------------------------------------

export interface StartCounterAction {
  type: 'startCounter';
}

export interface SetCounterAction {
  type: 'setCounter';
  payload: number;
}

export const startCounter = (): StartCounterAction => ({ type: 'startCounter' });
export const setCounter = (n: number): SetCounterAction => ({ type: 'setCounter', payload: n });

export type Actions = SetCounterAction | StartCounterAction;

// ------------------------------------------------------------------------------------------------
// Model
// ------------------------------------------------------------------------------------------------

export interface State {
  value: number;
}

// ------------------------------------------------------------------------------------------------
// Epics
// ------------------------------------------------------------------------------------------------

export const epic: AppEpic<SetCounterAction> = actions$ =>
  actions$.ofType('startCounter').pipe(
    switchMap(() =>
      interval(200).pipe(
        take(10),
        map(n => setCounter(n))
      )
    )
  );

// ------------------------------------------------------------------------------------------------
// Reducer
// ------------------------------------------------------------------------------------------------

export const reducer: AppReducer<State> = (state = { value: 0 }, action) => {
  switch (action.type) {
    case 'setCounter':
      return { value: action.payload };
    case 'startCounter':
      return { value: 0 };
  }
  return state;
};
