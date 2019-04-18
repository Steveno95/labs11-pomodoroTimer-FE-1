import React, { Component, history } from 'react';
import './App.css';
// import { Auth0Lock } from "auth0-lock";
import Billing from './components/account_settings/account_settings.js';

import Authenticate from './components/authentication/authentication.js'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Profile from './components/profile/profile.js';

import { connect } from "react-redux";
import {  getEmail } from './actions/index.js';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import axios from 'axios';


class App extends Component {
  constructor() {
    super();

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      id: localStorage.getItem('id'),
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      email: localStorage.getItem('email'),
      view: localStorage.getItem('view'),
      initial: false,
      modalShow: true,
      validated: false
    }
  }
  componentDidMount() {
    // http://localhost:8000
    // https://focustimer-labs11.heroku.com
    axios.get(`http://localhost:8000/api/users/${this.state.email}`)
      .then(res => {
        // console.log(res);
        this.setState({
          id: localStorage.setItem('id', res.data.id),
          firstName: localStorage.setItem('firstName', res.data.firstname),
          lastName: localStorage.setItem('lastName', res.data.lastname),
          email: localStorage.setItem('email', res.data.email),
          phone: localStorage.setItem('phone', res.data.phone),
          timerName: localStorage.setItem('timerName', res.data.timerName),
          timerStart: localStorage.setItem('timerStart', res.data.timerStart),
          timerEnd: localStorage.setItem('timerEnd', res.data.timerEnd),
          modalShow: false,
          validated: true,
          view: localStorage.setItem('view', 'done')
        })
      })
      .catch(err => console.log('err', err));
  }

  // componentDidUpdate() {
  //   this.state.view = localStorage.getItem('view');
  // }

  handleClose() {
    this.setState({ modalShow: false });
  }

  handleShow() {
    this.setState({ modalShow: true });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = () => {
    // http://localhost:8000
    // https://focustimer-labs11.herokuapp.com
    axios.post('http://localhost:8000/api/users', {
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      email: this.state.email
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            id: localStorage.setItem('id', res.data.id),
            firstName: localStorage.setItem('firstName', res.data.firstname),
            lastName: localStorage.setItem('lastName', res.data.lastname),
            email: localStorage.setItem('email', res.data.email),
            phone: localStorage.setItem('phone', res.data.phone),
            timerName: localStorage.setItem('timerName', res.data.timerName),
            timerStart: localStorage.setItem('timerStart', res.data.timerStart),
            timerEnd: localStorage.setItem('timerEnd', res.data.timerEnd)
          })
        } else if (res.status === 201) {
          console.log(this.state.email);
          axios.get(`http://localhost:8000/${localStorage.getItem('email')}`)
            .then(res => {
              this.setState({
                id: localStorage.setItem('id', res.data.id),
                firstName: localStorage.setItem('firstName', res.data.firstname),
                lastName: localStorage.setItem('lastName', res.data.lastname),
                email: localStorage.setItem('email', res.data.email),
                phone: localStorage.setItem('phone', res.data.phone),
                timerName: localStorage.setItem('timerName', res.data.timerName),
                timerStart: localStorage.setItem('timerStart', res.data.timerStart),
                timerEnd: localStorage.setItem('timerEnd', res.data.timerEnd)
              })
            })
            .catch(err => console.log('error', err))
        }
      }
        // this.setState({ id: localStorage.setItem('id', res.data.id) })
        // console.log(res.status)
      )
      .catch(err => console.log(err));
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      view: localStorage.setItem('view', 'done'),
      validated: true
    })
  }

  submit = () => {
    this.handleClose();
    this.submitHandler();
  }

  logout = () => {
    window.localStorage.clear();
    window.location.reload();
    history.push('/');
  }

  render() {
    const { validated } = this.state;
    
    return (
      <div>
        <Router>
          <div className="App">
            <div className="nav-bar">
              <NavLink exact to='/' className="links" >
                Profile
            </NavLink>

              <NavLink exact to='/billing' className="links" >
                Account Settings
            </NavLink>

              <NavLink to='/' className="links" onClick={this.logout} >
                Logout
            </NavLink>
            </div>
            <Route exact path='/' component={Profile} />
            <Route exact path='/billing' render={props => <Billing 
              {...props}
              id={this.state.id}
            />} />
          </div>
        </Router>
        <div className="Modal">
            {this.state.view === 'done' ? (
              <div></div>
            ) : (
              <div>
                <Button onClick={this.handleShow} className="modal-btn">Click Me to Register</Button>
                <Modal show={this.state.modalShow} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Please Confirm Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={this.submitHandler}
                  >
                  <Form.Row>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type='text'
                      onChange={this.handleChange}
                      name='firstName'
                      placeholder='firstName'
                      value={this.state.firstName}
                      
                    />
                  </Form.Row>
                  <Form.Row>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={this.handleChange}
                    name='lastName'
                    placeholder='lastName'
                    value={this.state.lastName}
                    
                  />
                  </Form.Row>
                  <Form.Row>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='text'
                      onChange={this.handleChange}
                      name='email'
                      placeholder='email'
                      value={this.state.email}
                      
                    />
                  </Form.Row>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={this.submit}>Submit</Button>
                <Button variant="secondary" onClick={this.handleClose}>Close</Button>
              </Modal.Footer>
              </Modal>
              </div>
              
            )}
          
        </div>
      </div>
    )
  }
}
// export default Authenticate(App);

const mapStateToProps = ({ gettingEmail, users }) => {
  return {
    gettingEmail,
    users
  };
};

export default connect(
  mapStateToProps,
  {
    /* action creators go here */
    getEmail,
  }
)(Authenticate(App));