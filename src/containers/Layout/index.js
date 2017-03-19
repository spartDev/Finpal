import React, { PropTypes } from 'react';

import { Header } from '../../components';

import styles from './styles.scss';

/**
 * Layout
 *
 * This container is in charge of displaying
 * root wrapper of application
 * @param {node} children
 *
 * @return {jsx}
 */

const Layout = ({ children }) => (
  <div className={styles.layout}>
    <Header className={styles.layout__header} />
    <main role="main" className={styles.layout__main} style={{ height: '100%' }}>
      <header className={styles.layout__main__header} />
      {children}
    </main>
  </div>
 );

/**
 * PropTypes Validation
 * @param {node} children
 */
const { node } = PropTypes;
Layout.propTypes = {
  children: node.isRequired,
};

export default Layout;
