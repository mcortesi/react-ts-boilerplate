import fetch from 'cross-fetch';
import { ThunkAction } from 'redux-thunk';
import { AppReducer } from './types';

// ------------------------------------------------------------------------------------------------
// Actions
// ------------------------------------------------------------------------------------------------

interface HerokuStatusResp {
  status: {
    Production: string;
    Development: string;
  };
  issues: any[];
}

async function fetchHerokuStatus(): Promise<
  { ok: true; value: HerokuStatusResp } | { ok: false; err: number }
> {
  const res = await fetch('https://status.heroku.com/api/v3/current-status');
  if (res.ok) {
    const body: HerokuStatusResp = await res.json();
    return { ok: true, value: body };
  }
  return { ok: false, err: res.status };
}

export interface StartFetchingAction {
  type: 'startFetching';
}
export interface SetHerokuStatusAction {
  type: 'setHerokuStatus';
  payload: HerokuStatusResp;
}
export interface SetFetchErrorAction {
  type: 'setFetchError';
  payload: string;
}

export const startFetching = (): StartFetchingAction => ({ type: 'startFetching' });
export const setHerokuStatus = (payload: HerokuStatusResp): SetHerokuStatusAction => ({
  type: 'setHerokuStatus',
  payload,
});
export const setFetchError = (payload: string): SetFetchErrorAction => ({
  type: 'setFetchError',
  payload,
});

export const dispathStatusCheck = (): ThunkAction<void, State, void, Actions> => {
  return (dispatch, getstate) => {
    dispatch(startFetching());
    fetchHerokuStatus()
      .then(res => {
        if (res.ok) {
          dispatch(setHerokuStatus(res.value));
        } else {
          dispatch(setFetchError(`statuc code: ${res.err}`));
        }
      })
      .catch(err => {
        dispatch(setFetchError(err.stack));
      });
  };
};

export type Actions = SetFetchErrorAction | SetHerokuStatusAction | StartFetchingAction;

// ------------------------------------------------------------------------------------------------
// Model
// ------------------------------------------------------------------------------------------------

export interface State {
  status?: HerokuStatusResp;
  inProgress: boolean;
  error?: string;
}

// ------------------------------------------------------------------------------------------------
// Reducer
// ------------------------------------------------------------------------------------------------

export const reducer: AppReducer<State> = (state = { inProgress: false }, action) => {
  switch (action.type) {
    case 'setHerokuStatus':
      return { inProgress: false, status: action.payload };
    case 'startFetching':
      return { inProgress: true };
    case 'setFetchError':
      return { inProgress: false, error: action.payload };
  }
  return state;
};
