import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AuthenticatedView from './components/AuthenticatedView';
import Landing from './components/Landing';
import LoginView from './components/LoginView';
import store from './store';



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route exact path="/:id" component={AuthenticatedView} />
                  <Route exact path="/login/admin" component={LoginView} />
                </Switch>
              </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
