import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import GeneratedMyLinks from './GeneratedMyLinks';

class LoginView extends Component {
  state = {
    isAuthenticated: false
  }
  
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { auth } = nextProps;

    if (! auth.uid) {
      return { isAuthenticated: false };
    }


    if (auth.uid) {

      let uids = ['P5w56MpbVebiTVhT7CQGxrkdgR53', 'cDwcrlbTpWfuqDY53sQMF1Cy8KG2', '33ZZo9RCVIZS4yW60dqyVkvgEDL2', 'w61RgKRvaEa4ERlFuJHJsiNOCTB3', 'sR5vZaGLnqXRLn92T1vQZD7m7eg2', 'pAlZp9NZJNZxIwaO7tzMCp3fvcl2', 'XGBeIqgZvCZCt3JxaVhgxpn5jHF2', 'uUb7gEobePhS61QPYzcw3I5KZ952'];

      if (uids.includes(auth.uid)) {
        return { isAuthenticated: true };
      } else {
        return { isAuthenticated: false };
      }
    }
  }
  

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    
    const { firebase } = this.props;
    const {email, password} = this.state;

    firebase
      .login({
        email,
        password
      })
      .catch(err => alert('Invalid Login Credentials'));
  }

  render() {

    var { isAuthenticated } = this.state;
    var { auth } = this.props;

    if (isAuthenticated) {
      return (
        <div>
          <GeneratedMyLinks uid={auth.uid}/>
        </div>
      )
      
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit} className="login-form">
            <label htmlFor="email">
              Email
              <input type="email" name="email" required value={this.state.email} onChange={this.handleChange} />
            </label>
            <label htmlFor="password">
              Password
              <input type="password" name="password" required value={this.state.password} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Ingresar" />
          </form>
        </div>
      )
    }
  }
}

LoginView.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(LoginView);
