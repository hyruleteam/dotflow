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
        <Route exact path="/" component={ProjectList}/>
        <Route path="/flowlist" component={FlowList}/>
      </div>
    );
  }
}

export default DefaultRouter;
