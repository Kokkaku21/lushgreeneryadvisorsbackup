import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from "./pages/LogIn"
import Dashboard from "./pages/DashiesPages/Dashboard"
import Profile from "./pages/Profile.js"
import Register from "./pages/Register"
import Visitors from "./pages/VisitorPages/Visitor"
import Settings from "./pages/Settings"
import RegisterSuccess from "./pages/RegisterWelcome"
import Contacts from "./pages/ContactsSettingsPages/ContactsSetting"
import ProfileSettings from "./pages/ProfileSettings"
import SettingsSuccess from "./pages/SettingSuccess"
import Customers from "./pages/ServedCustomersPages/ServedCustomers"

const authGuard = (Component) => (props) => {
  console.log(props);
  return localStorage.getItem('token') ? (
    <Component {...props} />
  ) : (
    <Redirect to="/login" />
  );
};


function Pages(props) {
  return (
    <Router {...props}>
      <Switch>
        <Route path="/login"><Login /></Route>
        <Route path="/register"><Register /></Route>
        <Route path="/success"><RegisterSuccess /></Route>
        <Route path="/home" component={authGuard(Dashboard)} />
        <Route path="/profile" component={authGuard(Profile)} />
        <Route path="/customers" component={authGuard(Visitors)} />
        <Route path="/servedcustomers" component={authGuard(Customers)} />
        <Route path="/contacts" component={authGuard(Contacts)} />
        <Route path="/settingprofile" component={authGuard(ProfileSettings)}/>
        <Route path="/setting" component={authGuard(Settings)} />
        <Route path="/settingsuccess" component={authGuard(SettingsSuccess)} />
        


        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  )
}
export default Pages;