import {
  Route
} from 'react-router-dom';
import React, { Component } from 'react';
import FlowList from './components/flowlist'
import ProjectList from './components/projectList'

class DefaultRouter extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={FlowList}/>
        <Route path="/about" component={ProjectList}/>
      </div>
    );
  }
}

export default DefaultRouter;
