import React from 'react';
import styles from './Habit.module.css';
import CheckboxSlider from '../CheckboxSlider';

export default function Habit({ habit, completeHabit }) {
  // todo: use tailwind
  return (
    <div className={styles.habit}>
      <CheckboxSlider isChecked={habit.achieved} onSelect={selected => completeHabit(habit.id, selected)} />
      <div className={styles.habit_text}>
        <div className={styles.habit_description}>{habit.description}</div>
        <div className={styles.habit_detail}>{habit.detail}</div>
      </div>
    </div>
  );
}
