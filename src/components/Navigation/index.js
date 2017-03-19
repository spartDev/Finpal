import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

import styles from './styles.scss';

/**
 * Hedaer Component
 *
 * This component is in charge of displaying a header
 *
 * @return {jsx}
 */
const Navigation = () => (
  <nav className={styles.navigation} role="navigation">
    <ul className={styles.navigation__section}>
      <li className={styles.navigation__item}>
        <a href='' className={styles.navigation__link}>Overwiew</a>
      </li>
      <li className={styles.navigation__item}>
        <Link to='transactions' className={styles.navigation__link}>Transactions (3)</Link>
      </li>
    </ul>
    <ul className={styles.navigation__section}>
      <li className={styles.navigation__item}>
        <a href='' className={styles.navigation__link}>Transferts (2)</a>
      </li>
      <li className={styles.navigation__item}>
        <a href='' className={styles.navigation__link}>Invoices (1)</a>
      </li>
    </ul>
    <ul className={styles.navigation__section}>
      <li className={styles.navigation__item}>
        <a href='' className={styles.navigation__link}>Manage cards</a>
      </li>
      <li className={styles.navigation__item}>
        <a href='' className={styles.navigation__link}>Manage accounts</a>
      </li>
    </ul>
    <ul className={styles.navigation__section}>
      <li className={styles.navigation__item}>
        <a href='' className={styles.navigation__link}>Team</a>
      </li>
      <li className={styles.navigation__item}>
        <a href='' className={styles.navigation__link}>Integrations</a>
      </li>
      <li className={styles.navigation__item}>
        <a href='' className={styles.navigation__link}>Settings</a>
      </li>
    </ul>
    <button className={styles.navigation__button}>Upgrade account</button>
  </nav>
);


export default Navigation;
