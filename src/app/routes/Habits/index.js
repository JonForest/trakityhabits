import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import db from '../../../fire';
import Habit from '../../components/Habit';
import Header from '../../components/Header';

export default function Habits() {
  const { date } = useParams();
  const history = useHistory();
  const [habits, updateHabits] = useState([]);

  function updateHabit(habitId, isComplete) {
    db.collection('days')
      .where('date', '==', date)
      .limit(1)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const day = doc.data();
          // Note: used .some here as better supported than .find for IE; though honestly, it's a nasty looking hack
          day.habits.some(habit => {
            if (habit.habit === habitId) {
              //todo: change to habit.id
              habit.achieved = isComplete;
              return true;
            } else return false;
          });
          db.collection('days')
            .doc(doc.id)
            .update({
              habits: day.habits
            });
        });
      });
  }

  useEffect(() => {
    const unsubscribe = db
      .collection('days')
      .where('date', '==', date)
      .limit(1)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          // Note, should only ever be one doc
          const day = doc.data();
          const habits = day.habits.map(habit => ({
            id: habit.habit, // todo: removed when changed to habit.id
            ...habit
          }));
          updateHabits(habits);
        });
      });
    return unsubscribe;
  }, [updateHabits, date]);

  return (
    <div className="flex flex-col items-stretch h-full">
      <Header className="flex-shrink-0" />
      <div className="flex-grow flex justify-center mt-6">
        {/* <div className={styles.date_slider}></div> */}
        <div className="flex max-w-lg flex-col px-4 w-11/12 md:w-4/6 xl:w-2/6">
          <h1 className="text-3xl mb-8 text-center">{new Date(date).toLocaleDateString('en-NZ')}</h1>
          {habits.map(habit => (
            <div key={habit.id + habit.achieved} className="mb-6">
              <Habit habit={habit} completeHabit={updateHabit} />
            </div>
          ))}
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
