import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class PaymentForm extends Component {

  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      pagoAprobado: false,
      name: '',
      lastname: '',
      sex: '',
      dni: '',
      email: '',
      telephone: '',
      invitadoDe: '',
      src: 'https://www.mercadopago.com/mla/checkout/start?pref_id=39364380-f486fd73-a1c5-4c2a-af76-8d11c5e06b7d'
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  openModal() {
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
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
    if (this.state.sex === '') {
      alert('Es necesario seleccionar tu género');
      return;
    }

    if (this.state.telephone.match(/^[0-9,+,(,),-]+$/) === null ) {
      alert('Revisá que tu teléfono esté bien escrito');
      return;
    }

    if ( this.state.dni.match(/^[0-9]+$/) === null ) {
      alert('Revisá que tu DNI esté bien escrito');
      return;
    }

    const invitado = this.state;

    delete invitado.src;
    delete invitado.modalIsOpen;

    const { firestore, access } = this.props;

    firestore.set('invitados/' + access.user, invitado)
    // firestore.add({collection: 'invitados'}, invitado)
    .then(() => {
      if (this.state.sex === 'Hombre') {
        this.setState({src: 'https://www.mercadopago.com/mla/checkout/start?pref_id=39364380-f486fd73-a1c5-4c2a-af76-8d11c5e06b7d'});
      } else {
        this.setState({src: 'https://www.mercadopago.com/mla/checkout/start?pref_id=39364380-da07c138-12c3-49ce-bd53-53f7fe18a6fd'});
      }
      window.$MPC.openCheckout ({
          url: this.state.src,
          mode: "modal",
          onreturn: function(data) {
            if (data.collection_status==='approved'){
              firestore.update('invitados/' + access.id, {pagoAprobado: true})
              .then(() => {
              })
              .catch( e => {
                alert("Ocurrió un error al ingresar tu pago. Avisar al administrador.");
                console.log(e);
              })
              this.setState({pagoAprobado: true});
              alert ('Gracias, recibimos tu pago');
            } else if(data.collection_status==='pending'){
              alert ('No completaste tu pago');
            } else if(data.collection_status==='in_process'){    
              alert ('El pago está siendo revisado');    
            } else if(data.collection_status==='rejected'){
              alert ('El pago fué rechazado, intentá nuevamente');
            } else if(data.collection_status===null){
              alert ('No completaste el proceso de pago');
            }
          }
      });
    })
    .catch(e => {
      alert("Ocurrió un error al registrar tus datos. Avisar al administrador.");
      console.log(e);
    });
    // console.log(this.state);
  }

  render() {
    const { pagoAprobado } = this.state;

    if ( ! pagoAprobado) {
      return (
        <div>
          <h3>Completá los siguientes campos y conseguí tu entrada</h3>
          <form onSubmit={this.handleSubmit} className="payment-form">
            <label htmlFor="name">
              Nombre
              <input type="text" name="name" required value={this.state.name} onChange={this.handleChange} />
            </label>
            <label htmlFor="lastname">
              Apellido
              <input type="text" name="lastname" required value={this.state.lastname} onChange={this.handleChange} />
            </label>
            <label htmlFor="telephone">
              Teléfono
              <input type="tel" name="telephone" minLength="8" required value={this.state.telephone} onChange={this.handleChange} />
            </label>
            <label htmlFor="email">
              Email
              <input type="email" name="email" required value={this.state.email} onChange={this.handleChange} />
            </label>
            <label htmlFor="dni">
              DNI
              <input type="text" inputMode="numeric" maxLength="8" name="dni" required value={this.state.dni} onChange={this.handleChange} />
            </label>
            <label htmlFor="sex">
              Género
              <br/>
              <div className="sexo-group-div">
                <div className="sexo-input-div"><input type="radio" value="Hombre" name="sex" onChange={this.handleChange}/> Hombre</div>
                <div className="sexo-input-div"><input type="radio" value="Mujer" name="sex" onChange={this.handleChange}/> Mujer</div>
              </div>
            </label>
            <input type="submit" value="Pagar" />
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Gracias por el pago ¡Nos vemos dentro de poco!</h3>
        </div>
      );
    }
  }
}

PaymentForm.propTypes = {
  firestore: PropTypes.object.isRequired,
  access: PropTypes.object.isRequired,
}

export default firestoreConnect()(PaymentForm);