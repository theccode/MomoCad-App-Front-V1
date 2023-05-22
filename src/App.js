import './App.css';
import React, { Component } from 'react';
import { ShopConnector } from './components/shop/ShopConnector';
import {BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MomoCadDataStore } from './components/data/DataStore';

 class App extends Component {
  render(){
    if (!navigator.onLine){
      return <h3>Poor or No Internet Connectivity</h3>
  } else {
    return <Provider store={ MomoCadDataStore }>
    <Router>
      <Switch>
        <Route path="/momocad" component={ ShopConnector } />
        <Redirect to="/momocad" />
      </Switch>
    </Router>
  </Provider>
  }
    
  }
}

export default App;
