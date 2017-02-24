import React, { Component } from 'react';
import {
    AppRegistry,
    StatusBar
} from 'react-native';
import App from './src/app';




StatusBar.setHidden(true);
AppRegistry.registerComponent('BudgetApp', () => App);
