import * as ACTION from './actionsTypes';

 /**
  * LOGIN PAGE ACTIONS
  */

export const transactionStart = () => ({
  type: ACTION.TRANSACTIONS_START,
  asyncStatus: 'PENDING',
});

export const transactionSuccess = (result) => ({
  type: ACTION.TRANSACTIONS_SUCCESS,
  asyncStatus: 'SUCCESS',
  payload: result,
});

export const transactionFailure = result => ({
  type: ACTION.TRANSACTIONS_ERROR,
  asyncStatus: 'FAILURE',
  payload: result,
});

export const transactions = () => async dispatch => {
  try {
    // We dispatch transactionStart to kickoff the call to the API
    dispatch(transactionStart());

    const response = await fetch('http://private-5d708-interviewfront.apiary-mock.com/transactions');
    const json = await response.json();

    if (response.ok) {
      // If response was successful
      // Dispatch the success action
      dispatch(transactionSuccess(json));
    } else {
      // If there was a problem, we want to
      // dispatch the error condition
      dispatch(transactionFailure(json));
    }
  } catch (error) {
    dispatch(transactionFailure(error));
    console.error(error);
  }
};
