import { combineReducers } from 'redux';
// Reducers
import flowlist from './flowlist';
import common from './common';

// Combine Reducers
var reducers = combineReducers({
  flowlist: flowlist,
  common: common
});

export default reducers;
