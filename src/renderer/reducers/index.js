import { combineReducers } from 'redux';
// Reducers
import flowlist from './flowlist';
import projectList from './projectList';
import common from './common';
import consoleWin from "./consoleWin";

// Combine Reducers
var reducers = combineReducers({
  flowlist: flowlist,
  projectList:projectList,
  common: common,
  consoleWin: consoleWin
});

export default reducers;
