/*in this file, we are going to connect our react application to index.js file  */
import React from 'react';
import ReactDOM from 'react-dom';

/*initialize redux */
//provider is going to keep track of the store, which is a global state, this allows us to track it from anywwhere in the app
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers';
import App from './App';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

//we are connecting the div with id of root 
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

