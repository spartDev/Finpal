import React, { PropTypes } from 'react';
import classnames from 'classnames';

import styles from './styles.scss';

/**
 * Hedaer Component
 *
 * This component is in charge of displaying a header
 *
 * @return {jsx}
 */
const Row = ({ date, name, amount, type, attachements, isActive, onClick }) => (
  <div className={classnames(styles.row, isActive ? styles.row__isActive : '')} onClick={onClick}>
    <div className={styles.row__date}>{date}</div>
    <div className={styles.row__name}>{name}</div>
    <div className={styles.row__type}>{type}</div>
    <div className={styles.row__amount}>{amount}</div>
    <div className={styles.row__attachment}>{attachements.length}</div>
  </div>
);

/**
 * PropTypes Validation
 *
 * @param {string} className
 */
const { string, func, array, bool } = PropTypes;
Row.propTypes = {
  date: string.isRequired,
  name: string.isRequired,
  amount: string.isRequired,
  type: string.isRequired,
  attachements: array.isRequired,
  isActive: bool.isRequired,
  onClick: func.isRequired,
};


export default Row;
