import { AppReducer } from './types';

// ------------------------------------------------------------------------------------------------
// Actions
// ------------------------------------------------------------------------------------------------

export interface SetMessageAction {
  type: 'setMessage';
  payload: string;
}

export const setMessage = (payload: string): SetMessageAction => ({ type: 'setMessage', payload });

export interface ClearMessageAction {
  type: 'clearMessage';
}

export const clearMessage = (): ClearMessageAction => ({ type: 'clearMessage' });

export type Actions = SetMessageAction | ClearMessageAction;

// ------------------------------------------------------------------------------------------------
// Model
// ------------------------------------------------------------------------------------------------

export interface State {
  message: string | null;
}

// ------------------------------------------------------------------------------------------------
// Reducer
// ------------------------------------------------------------------------------------------------

export const reducer: AppReducer<State> = (state = { message: null }, action) => {
  switch (action.type) {
    case 'clearMessage':
      return { message: null };
    case 'setMessage':
      return { message: action.payload };
  }
  return state;
};
