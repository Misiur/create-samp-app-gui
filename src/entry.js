import '../static/sass/main.scss';

import 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

import Main from './Main.js';
import state from './state';

const history = createHistory();
const store = configureStore(history, state);

const App = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Main />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(App, document.getElementById('react-root'));
