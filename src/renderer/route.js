import {
  Route
} from 'react-router-dom';
import React, { Component } from 'react';
import FlowList from './components/flowlist'
import ProjectList from './components/projectList'
import ConsoleWin from './components/consoleWin'

class DefaultRouter extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={ProjectList}/>
        <Route path="/flowlist" component={FlowList}/>
        <Route path="/consoleWin" component={ConsoleWin}/>
      </div>
    );
  }
}

export default DefaultRouter;
