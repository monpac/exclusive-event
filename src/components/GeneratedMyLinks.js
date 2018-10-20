import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import Link from './Link';

class GeneratedMyLinks extends Component {

  constructor() {
    super();

    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.generateAccess = this.generateAccess.bind(this);
  }

  copyToClipboard = (event) => {

    const eventValue = event.target.innerText;

    const el = document.createElement('textarea');
    el.value = eventValue;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    const la = document.createElement('span');
    la.innerText = "Link copiado";
    la.style.position = 'absolute';
    la.style.bottom = '2px';
    la.style.left = '50%';
    la.style.fontWeight = '900';
    la.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(la);

    setTimeout(() => {
      document.body.removeChild(la);
    }, 2000);
  };
  
  generateAccess(event) {

    const { firestore, uid } = this.props;

    firestore.add({collection: 'access'}, {owner: uid, user: '', createdAt: firestore.FieldValue.serverTimestamp()})
    .then(() => {
      const la = document.createElement('span');
      la.innerText = "Link Generado";
      la.style.position = 'absolute';
      la.style.bottom = '2px';
      la.style.left = '50%';
      la.style.fontWeight = '900';
      la.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(la);

      setTimeout(() => {
        document.body.removeChild(la);
      }, 1000);
    })
    .catch(e => {
      alert("Ocurrió un error al generar el link. Avisar al administrador.");
      console.log(e);
    });
  }

  render() {

    const { userAccess, uid } = this.props;
    
    return (
      <div>
        {
          !isLoaded(userAccess)
            ? <p>Cargando</p>
            : isEmpty(userAccess)
              ? 'Ningún link generado todavía'
              : userAccess.map((linkaccess, i) =>
                <Link key={linkaccess.id} uid={uid} link={linkaccess} />
                )
        }
        <button style={{cursor: 'pointer'}} onClick={this.generateAccess}>Generar Nuevo Link</button>
      </div>
    )
  }
}

GeneratedMyLinks.propTypes = {
  firebase: PropTypes.object.isRequired,
  uid: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
}

export default compose(
  firebaseConnect(),
  firestoreConnect(props => [
      { 
        collection: 'access',
        // where: ['owner', '==', props.uid],
        orderBy: ['createdAt']
      }
  ]),
  connect((state, props) => ({
    auth: state.firebase.auth,
    userAccess: state.firestore.ordered.access
  }))
)(GeneratedMyLinks);