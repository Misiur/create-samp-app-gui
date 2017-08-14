import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import '../static/sass/main.scss';

import configureStore from './store/configureStore';
import Main from './Main.js';
import state from './state';

const history = createHistory();
const store = configureStore(state);

const App = (
  <Provider store={store}>
    <Main />
  </Provider>
);

ReactDOM.render(App, document.getElementById('react-root'));
