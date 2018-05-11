import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import React, { Component } from 'react';
import FlowList from './components/flowlist'

const About = () => (
  <div>
    <h2>关于</h2>
  </div>
)

class DefaultRouter extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={FlowList}/>
          <Route path="/about" component={About}/>
        </div>
      </Router>
    );
  }
}

export default DefaultRouter;
