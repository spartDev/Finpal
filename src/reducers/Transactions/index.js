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

    default:
      return state;
  }
};

export default transactionsReducer;
