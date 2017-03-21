import React, { PropTypes } from 'react';
import moment from 'moment';

import styles from './styles.scss';

/**
 * Hedaer Component
 *
 * This component is in charge of displaying a aside
 *
 * @param {object} transactions
 *
 * @return {jsx}
 */
const Aside = ({ transactions }) => (
  <aside className={styles.aside}>
    <header className={styles.aside__header} />
    { transactions.selected &&
      <div className={styles.aside__body}>
        <div><strong>Date:</strong> {moment(transactions.selected.created_at).format('Do MMMM YYYY')}</div>
        <div><strong>Name:</strong> {transactions.selected.counterparty_name}</div>
        <div><strong>Operation:</strong> {transactions.selected.operation_type}</div>
        <div><strong>Amount:</strong> {transactions.selected.amount} {transactions.selected.currency}</div>
        <hr />
        <img className={styles.aside__img} src={transactions.selected.attachements[0].url} alt="" />
      </div>
    }
    { !transactions.selected &&
      <p className={styles.aside__message}>Click on one or several transactions to see details</p>
    }
  </aside>
);


/**
 * PropTypes Validation
 */
const { object } = PropTypes;
Aside.propTypes = {
  transactions: object.isRequired,
};

export default Aside;
