import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class Landing extends Component {

  render() {

    const { firebase } = this.props;

    firebase.auth().signInAnonymously().catch(error => {
        console.log(error);
        alert('Hubo un problema al revisar tu dispositivo');
    });

    return (
        <div>
            <h1>Esta página es privada :)</h1>
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