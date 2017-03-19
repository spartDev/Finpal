import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from './actions';

import styles from './styles.scss';

/**
 * Transactions Page
 *
 * This container is in charge of displaying
 * the Transactions page
 *
 * @return {jsx}
 */

export class Transactions extends Component {

  componentWillMount() {
    const { actions } = this.props;

    actions.transactions();
  }


  render() {
    const { transactions } = this.props;
    console.log(transactions);
    return (
      <div className={styles.transactionsPage}>
        {transactions.asyncStatus === 'SUCCESS' &&
        <div>
          {transactions.payload.transactions.map(transaction =>
            <div key={transaction.id}>{transaction.counterparty_name}</div>
          )}
        </div>
        }
      </div>
    );
  }
}

/**
 * Part of the Redux global state
 * does what our component want
 */
const mapStateToProps = state => ({
  transactions: state.transactions,
});

/**
 * Action creators does our component
 * want to receive by props
 */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
