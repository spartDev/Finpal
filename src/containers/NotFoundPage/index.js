import React from 'react';
import { Link } from 'react-router';

import styles from './styles.scss';

/**
 * Home
 *
 * This container is in charge of displaying
 * the 404 page not found
 *
 * @return {jsx}
 */

const NotFoundPage = () => (
  <div className={styles.notFoundPage}>
    <h1>404 error</h1>
    <p>Oops, Page was not found!</p>
    <Link to="/">return to home</Link>
  </div>
 );

export default NotFoundPage;
