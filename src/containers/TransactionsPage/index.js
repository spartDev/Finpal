import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import * as Actions from './actions';
import { Row } from '../../components';

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

  /**
   * PropTypes Validation
   *
   * @param {object} user
   * @param {object} actions
   */
  static propTypes = {
    transactions: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    isActive: PropTypes.bool,
  }

  static defaultProps = {
    isActive: false,
  }

  /**
   * Fetch Data on server
   */
  static fetchData({ store }) {
    const { dispatch } = store;

    return dispatch(Actions.transactions());
  }

  /**
   * When component is mouted
   */
  componentDidMount() {
    const { actions } = this.props;

    actions.transactions();
  }

  selectRow = rowId => {
    const { actions } = this.props;
    let { isActive } = this.props;

    actions.transactionSelected(rowId, isActive = !isActive);
  }

  /**
   * Make each column sortable
   */
  sortRowBy(filter) {
    const { actions } = this.props;
    this.asc = !this.asc;

    actions.transactionSortedBy(filter, this.asc ? 'asc' : 'desc');
  }


  render() {
    const { transactions } = this.props;

    return (
      <div className={styles.transactionsPage}>
        {transactions.asyncStatus === 'SUCCESS' &&
        <div>
          <div className={styles.transactionsPage__header}>
            <div className={styles.transactionsPage__headerDate} onClick={() => this.sortRowBy('created_at')}>Date</div>
            <div className={styles.transactionsPage__headerName} onClick={() => this.sortRowBy('counterparty_name')}>Name</div>
            <div className={styles.transactionsPage__headerOperation} onClick={() => this.sortRowBy('operation_type')}>Operation</div>
            <div className={styles.transactionsPage__headerAmount} onClick={() => this.sortRowBy('amount')}>Amount</div>
            <div>A</div>
          </div>
          {transactions.payload.map(transaction =>
            <Row
              key={transaction.id}
              date={moment(transaction.created_at).format('DD - MM - YYYY')}
              name={transaction.counterparty_name}
              type={transaction.operation_type}
              amount={`${transaction.amount} ${transaction.currency}`}
              attachements={transaction.attachements}
              isActive={transactions.selected ? transaction.id === (transactions.selected.id) : false}
              onClick={() => this.selectRow(transaction.id)}
            />
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
