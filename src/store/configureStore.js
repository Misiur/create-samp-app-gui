import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import initialState from '../state';
import reducers from '../reducers';

export default function configureStore() {
  const store = createStore(
    combineReducers({
      ...reducers,
      form: formReducer,
    }),
  );

  return store;
}
