import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { transactionsReducer as transactions } from './Transactions';

export default combineReducers({
  routing,
  transactions,
});
