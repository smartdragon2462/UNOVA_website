import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { render } from 'react-dom';
import store from './store';
import App from './scenes/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/fonts/font-awesome/scss/font-awesome.css';
const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <HashRouter>
      <App/>
    </HashRouter>
  </Provider>,
  target
);
serviceWorker.unregister();
