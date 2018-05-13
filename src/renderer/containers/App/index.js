import React, { Component } from 'react';
import {
  HashRouter as Router,
} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from '../../store.js'
import DefaultRouter from '../../route';
import './index.css';

class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <DefaultRouter/>
        </Router>
      </Provider>
    );
  }
}

export default Index;
