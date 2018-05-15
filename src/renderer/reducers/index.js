import { combineReducers } from 'redux';
// Reducers
import flowlist from './flowlist';
import projectList from './projectList';
import common from './common';

// Combine Reducers
var reducers = combineReducers({
  flowlist: flowlist,
  projectList:projectList,
  common: common
});

export default reducers;
