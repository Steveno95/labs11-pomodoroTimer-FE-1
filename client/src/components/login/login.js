import React, { Component } from "react";
import "./login.css";
import { Auth0Lock } from "auth0-lock";
import Logo from "../../assets/FINAL Focus Timer-01(trim).png";

import Button from "react-bootstrap/Button";
import Media from "react-bootstrap/Media";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

// Auth0Lock options (testing purposes)
// var options = {
//   auth: {
//     redirectUrl: 'https://client.mjhacker.now.sh/'
//   }
// };

var options = {};

// The lock function contains 2 arguments, the Client ID and the domain
var lock = new Auth0Lock(
  "2u1N0tM8yEP53wgkylA3xdP0WqNLq0xr",
  "mjhacker.auth0.com",
  options
);

class Login extends Component {
  render() {
    // console.log("PROCESS: ", process.env);
    lock.on("authenticated", function(authResult) {
      // Use the token in authResult to getUserInfo() and save it to localStorage
      lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          // Handle error
          // console.log(`Error: ${error}`);
          return;
        } else {
          // console.log(authResult);
          alert("hello, " + profile.name);

          localStorage.setItem("accessToken", authResult.accessToken);
          localStorage.setItem("profile", JSON.stringify(profile));
          localStorage.setItem("email", profile.email);
          localStorage.setItem("firstName", profile.given_name);
          localStorage.setItem("lastName", profile.family_name);
          window.location.reload();
        }
      });
    });

    return (
      <div className="Landing">
        <div className="header-div">
          <header className="top">
            <div className="logo">
              <img src={Logo} />
            </div>
            <Button
              onClick={function() {
                lock.show();
              }}
              variant="primary"
            >
              Login
            </Button>
          </header>
        </div>
        <div className="blurb">
          <div className="media-image">
            <img
              src="https://media.giphy.com/media/39d07hnWZ6cBW/giphy.gif"
              alt="Spider-Man"
            />
          </div>
          <div className="media-content">
            <h3 className="media-head">
              The Timer You Never Knew You Needed...
            </h3>
            <p className="media-text">
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
              scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum
              in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
              nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            </p>
          </div>
        </div>
        <div className="comparison">
          <Card className="free" style={{ width: "18rem " }}>
            <Card.Body>
              <Card.Title>Lite Plan</Card.Title>
              <Card.Subtitle className="subtitle">
                Basic Functionality & Performance
              </Card.Subtitle>
              <Card.Text>
                Focus Timer Lite is geared for those users who do not need all
                the bells and whistles. Users can effortlessly integrate our app
                into a Slack workspace and sets themselves in "Focus Mode."
              </Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Focus, Short, Long break presets
                </ListGroup.Item>
                <ListGroup.Item>Easy Slack Integration</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className="premium" style={{ width: "18rem " }}>
            <Card.Body>
              <Card.Title>Premium Plan</Card.Title>
              <Card.Subtitle className="subtitle">
                Performance + Customization
              </Card.Subtitle>
              <Card.Text>
                Focus Timer Premium is geared for those users that want their
                timer to be unique as they are. Users can effortlessly integrate
                our app into a Slack workspace and sets themselves in "Focus
                Mode."
              </Card.Text>
              <p>All the features of Lite Plan PLUS:</p>
              <ListGroup variant="flush">
                <ListGroup.Item>Customizable timer intervals</ListGroup.Item>
                <ListGroup.Item>Customizable themes</ListGroup.Item>
                <ListGroup.Item>
                  All future feature releases at no additional charge
                </ListGroup.Item>
                <ListGroup.Item>
                  A BIG thank you & virtual Hi-Five! Go you!
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
        <div className="bottom">
          <h3>Are You Ready?</h3>
          <p>
            Try out Focus Timer for yourself today and see how more productive
            life can be.
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
