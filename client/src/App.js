import React, { Component } from 'react';
import './App.css';

import Authenticate from './components/authentication/authentication'

import Profile from "./components/profile/profile";

import UserListView from './dummy-display/userListView';

import Billing from './components/billing/billing';


class App extends Component {
  
  render() {
    
    
    return (
      <div className="App">
        <Profile />
        <Billing />
        <div className="name-container">
          <UserListView />
        </div>
      </div>
      
    )
  } 
}
export default Authenticate(App);