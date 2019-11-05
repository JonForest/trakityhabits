import React from 'react';
import styles from './CheckboxSlider.module.css';

export default function CheckboxSlider({isChecked, onSelect}) {
  function onChange(e) {
    onSelect(e.target.checked);  
  }
  return (
    <label className={styles.switch}>
      <input type="checkbox" onChange={onChange} defaultChecked={isChecked}/>
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label> 
  );
}