import React from 'react';
import styles from './CheckboxSlider.module.css';

export default function CheckboxSlider({onSelect}) {
  function onChange(e) {
    onSelect(e.target.checked);  
  }
  return (
    <label className={styles.switch}>
      <input type="checkbox" onChange={onChange}/>
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label> 
  );
}