import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Aside, Header } from '../../components';

import styles from './styles.scss';

/**
 * Layout
 *
 * This container is in charge of displaying
 * root wrapper of application
 *
 * @param {node} children
 * @param {object} transactions
 *
 * @return {jsx}
 */

export const Layout = ({ children, transactions }) => (
  <div className={styles.layout}>
    <Header className={styles.layout__header} />
    <main role="main" className={styles.layout__main} style={{ height: '100%' }}>
      <header className={styles.layout__main__header} />
      {children}
    </main>
    {children.props.route.path === '/transactions' &&
      <Aside transactions={transactions} />
    }
  </div>
);

/**
 * PropTypes Validation
 */
const { node, object } = PropTypes;
Layout.propTypes = {
  children: node.isRequired,
  transactions: object.isRequired,
};

/**
 * Part of the Redux global state
 * does what our component want
 */
const mapStateToProps = state => ({
  transactions: state.transactions,
});

export default connect(mapStateToProps)(Layout);
