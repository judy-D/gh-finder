import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import configureStore from '../src/store/store';
import { PersistGate } from "redux-persist/lib/integration/react";

const { store, persistor } = configureStore();

ReactDOM.render(
    <Provider store={store}>
          <PersistGate persistor={persistor}>
      <App/>
      </PersistGate >
    </Provider>, document.getElementById('root'));
