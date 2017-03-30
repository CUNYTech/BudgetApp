import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { Home, Login, Register, Dashboard, Friends, Goals, Budget, Points, Settings, Profile, AccountSettings,
  AccountDelete, ChangePassword, Privacy, ReportProblem } from '../../pages';

const getScenceStyle = (scene) => {
  let style = { backgroundColor: 'transparent' };
  if (scene.navigationState.index !== scene.scene.index) {
    style = { ...style, opacity: 0 };
  }
  return style;
};

export default class AppRouter extends Component {

  constructor(props) {
    super(props);
    this.toggleSideMenu = this.props.toggleSideMenu.bind(this);
    this.firebaseApp = this.props.firebaseApp;
  }

  render() {
    return (
      <Router getSceneStyle={getScenceStyle}>
        <Scene initial hideNavBar key="home" component={Home} type="reset" Firebase={this.firebaseApp} />
        <Scene hideNavBar key="login" component={Login} type="reset" Firebase={this.firebaseApp} />
        <Scene hideNavBar key="register" component={Register} type="reset" Firebase={this.firebaseApp} />
        <Scene hideNavBar key="dashboard" component={Dashboard} type="reset" Firebase={this.firebaseApp} sideMenu={this.toggleSideMenu} />
        <Scene hideNavBar key="friends" component={Friends} type="reset" Firebase={this.firebaseApp} sideMenu={this.toggleSideMenu} />
        <Scene hideNavBar key="goals" component={Goals} type="reset" Firebase={this.firebaseApp} sideMenu={this.toggleSideMenu} />
        <Scene hideNavBar key="budget" component={Budget} type="reset" Firebase={this.firebaseApp} sideMenu={this.toggleSideMenu} />
        <Scene hideNavBar key="points" component={Points} type="reset" Firebase={this.firebaseApp} sideMenu={this.toggleSideMenu} />
        <Scene hideNavBar key="settings" component={Settings} type="reset" Firebase={this.firebaseApp} sideMenu={this.toggleSideMenu} />
        <Scene hideNavBar key="profile" component={Profile} type="reset" Firebase={this.firebaseApp} sideMenu={this.toggleSideMenu} />
        <Scene hideNavBar key="accountsettings" component={AccountSettings} type="reset" Firebase={this.firebaseApp} sideMenu={this.toggleSideMenu} />
        <Scene hideNavBar key="accountdelete" component={AccountDelete} type="reset" Firebase={this.firebaseApp} sideMenu={this.toggleSideMenu} />
        <Scene hideNavBar key="privacy" component={Privacy} type="reset" Firebase={this.firebaseApp} sideMenu={this.toggleSideMenu} />
        <Scene hideNavBar key="changepassword" component={ChangePassword} type="reset" Firebase={this.firebaseApp} sideMenu={this.toggleSideMenu} />
        <Scene hideNavBar key="reportproblem" component={ReportProblem} type="reset" Firebase={this.firebaseApp} sideMenu={this.toggleSideMenu} />
      </Router>
    );
  }
}
