import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

import { Navigation } from '../'

import styles from './styles.scss';

/**
 * Hedaer Component
 *
 * This component is in charge of displaying a header
 *
 * @return {jsx}
 */
const Header = ({ className }) => {
  const classes = classnames(styles.header, className)
  return (
    <header className={classes} role="banner">
      <div className={styles.header__head}>
        <Link to='/'><h1 className={styles.header__brandName}>Finpal</h1></Link>
      </div>
      <div className={styles.header__body}>
        <Navigation />
      </div>
    </header>
  );
};


export default Header;
