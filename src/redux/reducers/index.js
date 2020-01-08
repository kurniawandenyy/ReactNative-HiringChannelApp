import {combineReducers} from 'redux';

import Auth from './auth';
import listEngineers from './engineers';
import listCompanies from './companies';

const rootReducer = combineReducers({
  Auth,
  listEngineers,
  listCompanies,
});

export default rootReducer;
