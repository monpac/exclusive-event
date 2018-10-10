import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import store from './store';
import AuthenticatedView from './components/AuthenticatedView';




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
                </Switch>
              </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
