import { combineReducers } from 'redux';

// Reducers
import flowlist from './flowlist';

// Combine Reducers
var reducers = combineReducers({
  flowlist: flowlist
});

export default reducers;
