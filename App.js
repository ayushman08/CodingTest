import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Actions, Router, Reducer, Scene } from 'react-native-router-flux';

import SearchComponent from './App/Components/SearchComponent/SearchComponent';
import ImageDetailComponent from './App/Components/ImageDetailComponent/ImageDetailComponent'

const scenes = Actions.create(
  <Scene key="root">

    <Scene key="searchComponent" component={SearchComponent}
      hideNavBar={true}
      initial
   
    />

    <Scene key="imageDetail" component={ImageDetailComponent}
      hideNavBar={true}
   />
 </Scene>
);

export default class App extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <Router
        scenes={scenes}
      />
    );
  }
}
