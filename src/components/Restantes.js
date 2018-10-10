import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class Restantes extends Component {
  render() {
    const { disponibles } = this.props;


    if(disponibles) {
      let entradas;
      if (disponibles.disponibles > 100) {
        entradas = disponibles.fake;
      } else {
        entradas = disponibles.disponibles;
      }

      return (
        <div>
          <p className="entradas-disponibles">Quedan sólo <strong>{entradas}</strong> lugares disponibles</p>
        </div>
      )
    } else {
      return null;
    }
  }
}

Restantes.propTypes = {
    firebase: PropTypes.object.isRequired
}

export default compose(
  firestoreConnect(props => [
      { collection: 'disponibles', doc: 'AizDic8wYjJmuvUwrQmU'}
  ]),
  connect((state, props) => ({
      disponibles: state.firestore.ordered.disponibles && state.firestore.ordered.disponibles[0]
  }))
)(Restantes);