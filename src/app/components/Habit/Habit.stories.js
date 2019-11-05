import React from 'react';
import { action } from '@storybook/addon-actions';
import Habit from '.'

const notes = `
# Habit
A completable Habit
`

const habits = [{
  id: 1,
  description: '3 x dumbbell curls',
  detail: 'Use a 15kg dumbbell',
  completed: true
}, {
  id: 2,
  description: '3 x 30 sit-ups',
  detail: 'Knees bent, slide hands over knees',
  completed: false
}, {
  id: 3,
  description: '5 x Stairs sprints',
  detail: 'Run up the steps on the hill, jog down to regain breath',
  completed: true
}]

export default {
  title: 'Habit',
  parameters: { notes }
};

export const normal = () => <Habit habit={habits[0]} completeHabit={action('isComplete')}/>;
