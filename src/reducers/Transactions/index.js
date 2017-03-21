import { orderBy } from 'lodash';
import * as ACTION from '../../containers/TransactionsPage/actionsTypes';

const InitialState = {
  asyncStatus: 'NO_STATUS',
};

export const transactionsReducer = (state = InitialState, action = {}) => {
  switch (action.type) {

    case ACTION.TRANSACTIONS_START:
      return {
        ...state,
        asyncStatus: action.asyncStatus,
      };

    case ACTION.TRANSACTIONS_SUCCESS:
      return {
        ...state,
        asyncStatus: action.asyncStatus,
        payload: action.payload,
      };

    case ACTION.TRANSACTIONS_ERROR: {
      return {
        ...state,
        asyncStatus: action.asyncStatus,
        payload: action.payload,
      };
    }
    case ACTION.TRANSACTIONS_SORT: {
      return {
        ...state,
        direction: action.direction,
        payload: orderBy(state.payload, [action.filter], [action.direction]),
      };
    }
    case ACTION.TRANSACTIONS_SELECTED: {
      return {
        ...state,
        isActive: action.isActive,
        // TODO: Refactor this
        // We need to substract action id from -1
        // to match payload index
        selected: state.payload[(action.id - 1)],
      };
    }

    default:
      return state;
  }
};

export default transactionsReducer;
