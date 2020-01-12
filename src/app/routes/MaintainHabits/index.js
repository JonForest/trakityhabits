import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import HabitResult from '../../components/HabitResult';
import db, { getUser } from '../../../fire';
import HabitSettings from './components/HabitSettings';

export default function MaintainHabits() {
  const [habits, updateHabits] = useState([]);
  const { uid } = getUser();

  useEffect(() => {
    const unsubscribe = db
      .collection(`users/${uid}/habits`)
      .where('deleted', '==', false)
      .onSnapshot(querySnapshot => {
        const habitsArray = [];
        querySnapshot.forEach(doc => {
          habitsArray.push({ id: doc.id, ...doc.data() });
        });
        updateHabits(habitsArray);
      });
    return unsubscribe;
  }, [updateHabits, uid]);

  return (
    <Layout title="Maintain Habits" linkText="See dashboard" linkTo="/">
      <div className="flex justify-center">
        <div className="flex max-w-lg flex-col px-4 w-11/12 md:w-4/6 xl:w-2/6">
          <HabitSettings />

          {habits.map(habit => (
            <HabitResult key={habit.id} habit={habit} />
          ))}

          <Link to="/maintain/add">Add a new Habit</Link>
        </div>
      </div>
    </Layout>
  );
}
