import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Login from './components/login/login';

export default class BudgetApp extends Component {
 render() {
   return (
     <Login />
   );
 }
}
