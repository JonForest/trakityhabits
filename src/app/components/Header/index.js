import React from 'react';
import styles from './Header.module.css';

export default function Header () {
  return (
    <div className={styles.bar}>
      <h1>Trakity</h1>
      <div className={styles.menu}>MEnu</div>
    </div>
  );
}