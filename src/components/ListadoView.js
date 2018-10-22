import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';

class ListadoView extends Component {
  state = {
    isAuthenticated: false,
    isApproved: true
  }


  constructor() {
    super();

    this.modifyPayments = this.modifyPayments.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { auth } = nextProps;

    if (! auth.uid) {
      return { isAuthenticated: false };
    }


    if (auth.uid) {

      let uids = ['MxvE45LAArNC1ui9gVmVHqZ3Y503', 'P5w56MpbVebiTVhT7CQGxrkdgR53', 'cDwcrlbTpWfuqDY53sQMF1Cy8KG2', '33ZZo9RCVIZS4yW60dqyVkvgEDL2', 'w61RgKRvaEa4ERlFuJHJsiNOCTB3', 'sR5vZaGLnqXRLn92T1vQZD7m7eg2', 'pAlZp9NZJNZxIwaO7tzMCp3fvcl2', 'XGBeIqgZvCZCt3JxaVhgxpn5jHF2', 'uUb7gEobePhS61QPYzcw3I5KZ952'];

      if (uids.includes(auth.uid)) {
        return { isAuthenticated: true };
      } else {
        return { isAuthenticated: false };
      }
    }
  }

  modifyPayments(event) {
    var { isApproved } = this.state;
    this.setState({isApproved: ! isApproved});
  }

  render() {

    var { isAuthenticated, isApproved } = this.state;
    var { invitados } = this.props;

    if (isAuthenticated) {
        if (isApproved) {
            return (
                <div>
                    <button style={{cursor: 'pointer', margin: '0px'}} onClick={this.modifyPayments}>Ver Pagos No Aprobados</button>
                    <table style={{borderSpacing: '2rem', textAlign: 'left'}}>
                        
                  {
                    !isLoaded(invitados)
                        ? <p>Cargando</p>
                        : isEmpty(invitados)
                        ? 'Ningún link generado todavía'
                        : invitados.filter(function (invitado) {
                            return invitado.pagoAprobado;
                          }).map((invitado, i) =>
                            <tr><td>{invitado.id}</td><td>{invitado.name}</td><td>{invitado.lastname}</td><td>{invitado.email}</td><td>{invitado.telephone}</td><td>{invitado.sex}</td></tr>
                            )
                  }
                  </table>
                </div>
              )   
        } else {
            return (
                <div>
                    <button style={{cursor: 'pointer', margin: '0px'}} onClick={this.modifyPayments}>Ver Pagos Aprobados</button>
                    <table style={{borderSpacing: '2rem', textAlign: 'left'}}>  
                  {
                    !isLoaded(invitados)
                        ? <p>Cargando</p>
                        : isEmpty(invitados)
                        ? 'Ningún link generado todavía'
                        : invitados.filter(function (invitado) {
                            return ! invitado.pagoAprobado;
                          }).map((invitado, i) =>
                            <tr><td>{invitado.id}</td><td>{invitado.name}</td><td>{invitado.lastname}</td><td>{invitado.email}</td><td>{invitado.telephone}</td><td>{invitado.sex}</td></tr>
                            )
                  }
                  </table>
                </div>
              )  
        }
    } else {
      return null;
    }
    }
}

ListadoView.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

export default compose(
  firebaseConnect(),
  firestoreConnect(props => [
      { 
        collection: 'invitados'
      }
  ]),
  connect((state, props) => ({
    auth: state.firebase.auth,
    invitados: state.firestore.ordered.invitados
  }))
)(ListadoView);
