import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import HabitResult from '../../components/HabitResult';
import db, { getUser } from '../../../fire';

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
    <div className="flex flex-col items-stretch h-full">
      <Header className="flex-shrink-0" />
      <div className="flex-grow-0 flex justify-center mt-6">
        {/* <div className={styles.date_slider}></div> */}
        <h1 className="text-3xl mb-2 text-center">Maintain Habits</h1>
      </div>
      <div className="flex-grow flex justify-center mt-6">
        <div className="flex max-w-lg flex-col px-4 w-11/12 md:w-4/6 xl:w-2/6">
          {habits.map(habit => (
            <HabitResult key={habit.id} habit={habit} />
          ))}
          <Link to="/maintain/add">Add a new Habit</Link>
        </div>
      </div>
      <footer className="w-100 bg-teal-700 flex-shrink-0 flex justify-center py-2">
        <Link
          to="/"
          className="text-xl tracking-widest text-white underline lg:text-2x lg:text-teal-100 lg:focus:text-white lg:no-underline lg:hover:text-white lg:hover:underline"
        >
          See dashboard
        </Link>
      </footer>
    </div>
  );
}
