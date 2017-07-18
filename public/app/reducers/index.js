import { combineReducers } from 'redux';
import {
  directoryHasErrored,
  directoryIsLoading,
  directory
} from './grow-your-own-reducer';

const reducer = combineReducers({
  directory,
  directoryHasErrored,
  directoryIsLoading
});

export default reducer;
