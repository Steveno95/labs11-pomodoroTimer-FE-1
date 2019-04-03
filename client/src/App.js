import React, { Component } from 'react';
import './App.css';
import { Auth0Lock } from "auth0-lock";
import Billing from './components/billing/billing';

// testing bootstrap
import Button from 'react-bootstrap/Button';
import UserListView from "./dummy-display/userListView";

import SlackButton from "./components/button/slackButton";

// The lock function contains 2 arguments, the Client ID and the domain
var lock = new Auth0Lock(
  '2u1N0tM8yEP53wgkylA3xdP0WqNLq0xr',
  'mjhacker.auth0.com'
);

class App extends Component {
  
  render() {
    console.log("PROCESS: ", process.env)
    lock.on("authenticated", function(authResult) {
      // Use the token in authResult to getUserInfo() and save it to localStorage
      lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          // Handle error
          console.log(`Error: ${error}`);
          return;
        } else {
    
        console.log(authResult);
        alert("hello, " + profile.name);
    
        localStorage.setItem('accessToken', authResult.accessToken);
        localStorage.setItem('profile', JSON.stringify(profile));
      }});
    });

    return (
      <div className="App">
        <header>
          <h1>Focus Timer</h1>
          {/* testing button from bootstrap */}
          <Button onClick={function() {
            lock.show()
            }} variant="primary">Login</Button>
        </header>
        <div className="name-container">
          <UserListView />
          <SlackButton />
        </div>
        <Billing />
      </div>
    )}}

export default App;