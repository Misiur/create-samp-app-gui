import { combineEpics } from 'redux-observable';

function mainEpic(action$) {
  return action$
    .ofType('FUCK')
    .mapTo({ type: 'NOOP' })
  ;
}

export default combineEpics(
  mainEpic,
);