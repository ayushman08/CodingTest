/** @format */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'
// import configureStore from './App/Store/configureStore'
import App from './App';

import {name as appName} from './app.json';
// const store = configureStore()
console.disableYellowBox = true;
const ReduxApp = () => (
  // <Provider store={store}>
    <App />
  // </Provider>
)

AppRegistry.registerComponent(appName, () => ReduxApp);

