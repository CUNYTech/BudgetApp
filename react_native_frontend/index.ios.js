import React, { Component } from 'react';
import {
    AppRegistry,
    StatusBar
} from 'react-native';
import App from './src/app'

StatusBar.setBarStyle('light-content');


AppRegistry.registerComponent('BudgetApp', () => App);
