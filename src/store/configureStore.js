import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerReducer, routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import initialState from '../state';
import rootEpic from '../epics';
import reducers from '../reducers';

export default function configureStore(history) {
  const observableMiddleware = createEpicMiddleware(rootEpic);
  const routerMiddleware = createRouterMiddleware(history);
  const store = createStore(
    combineReducers({
      ...reducers,
      router: routerReducer,
      form: formReducer,
    }),
    compose(
      applyMiddleware(observableMiddleware, routerMiddleware),
    ),
  );

  return store;
}
