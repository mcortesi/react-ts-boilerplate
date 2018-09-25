import * as React from 'react';
import { connect } from 'react-redux';
import { clearMessage, setMessage } from '../ducks/message';
import { dispathStatusCheck } from '../ducks/status';
import { startCounter } from '../ducks/counter';
import { AppState } from '../ducks/types';

export interface MainViewProps extends AppState {
  clearMessage: typeof clearMessage;
  setMessage: typeof setMessage;
  startCounter: typeof startCounter;
  dispathStatusCheck: typeof dispathStatusCheck;
}

const App = (props: MainViewProps) => (
  <div>
    <h1>Main app</h1>
    <div>Current Message is: {props.message.message}</div>
    <div>
      <button onClick={() => props.clearMessage()}>Clear Message</button>
      <button onClick={() => props.setMessage('Hello World')}>Set Message</button>
    </div>
    <div>
      <h2>Heroku Status</h2>
      <button onClick={props.dispathStatusCheck}>Check Status</button>
      {props.status.inProgress ? (
        'working...'
      ) : (
        <div>
          {props.status.status && `Production is ${props.status.status.status.Production}`}
          {props.status.error && `Fetch error: ${props.status.error}`}
        </div>
      )}
    </div>
    <div>
      <button onClick={props.startCounter}>Start Counter</button>
      <div> Counter: {props.counter.value}</div>
    </div>
  </div>
);

function mapStateToProps(state: AppState) {
  return state;
}

export default connect(
  mapStateToProps,
  { clearMessage, setMessage, dispathStatusCheck, startCounter }
)(App);
