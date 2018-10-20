import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import flyer from '../assets/images/flyer.jpeg';

class Landing extends Component {

  render() {

    const { firebase } = this.props;

    firebase.auth().signInAnonymously().catch(error => {
        console.log(error);
        alert('Hubo un problema al revisar tu dispositivo');
    });

    return (
        <div>
            <h1>Hablá con un organizador y pedí tu código</h1>
            <img style={{maxWidth: '500px', width: '100%'}} alt="Flyer" src={flyer} />
        </div>
    )
    
  }
}

Landing.propTypes = {
    firebase: PropTypes.object.isRequired
}

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth
    }))
)(Landing);