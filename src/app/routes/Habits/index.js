import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import db, { getUser } from '../../../fire';
import Habit from '../../components/Habit';
import Header from '../../components/Header';
import {findCategoryName} from '../../../utils';

export default function Habits() {
  const { uid } = getUser();
  const { date } = useParams();
  const [categories, updateCategories] = useState([]);
  const [uncategorisedHabits, updateUncategorisedHabits] = useState([]);
  const [categorisedHabits, updateCategorisedHabits] = useState([]);

  function updateHabit(habitId, isComplete) {
    db.collection(`users/${uid}/days`)
      .where('date', '==', date)
      .limit(1)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const day = doc.data();
          // Note: used .some here as better supported than .find for IE; though honestly, it's a nasty looking hack
          day.habits.some(habit => {
            if (habit.id === habitId) {
              habit.achieved = isComplete;
              return true;
            } else return false;
          });
          db.collection(`users/${uid}/days`)
            .doc(doc.id)
            .update({
              habits: day.habits
            });
        });
      });
  }

  useEffect(() => {
    return db
      .collection(`users/${uid}/days`)
      .where('date', '==', date)
      .limit(1)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          const day = doc.data();
          const habitsObj = {};
          const uncategorisedHabitsArray = [];

          day.habits.forEach(habit => {
            if (habit.categoryId) {
              if (habitsObj[habit.categoryId]) habitsObj[habit.categoryId].push(habit);
              else habitsObj[habit.categoryId] = [habit];
            } else {
              uncategorisedHabitsArray.push(habit);
            }
          })
          updateUncategorisedHabits(uncategorisedHabitsArray);
          updateCategorisedHabits(habitsObj);
        });
      });
  }, [updateUncategorisedHabits, updateCategorisedHabits, date, uid]);

    // Fetch categories
  useEffect(() => {
    return db
      .collection(`users/${uid}/categories`)
      .onSnapshot(querySnapshot => {
        const categoriesArray = [];
        querySnapshot.forEach(doc => {
          categoriesArray.push({id: doc.id, ...doc.data()});
        });
        updateCategories(categoriesArray);
      });
  }, [updateCategories, uid]);

  return (
    <div className="flex flex-col items-stretch h-full">
      <Header className="flex-shrink-0" />
      <div className="flex-grow flex justify-center mt-6">
        {/* <div className={styles.date_slider}></div> */}
        <div className="flex max-w-lg flex-col px-4 w-11/12 md:w-4/6 xl:w-2/6">
          <h1 className="text-3xl mb-8 text-center">{new Date(date).toLocaleDateString('en-NZ')}</h1>
          {Object.keys(categorisedHabits).map(key => (
            <div key={key}>
              {findCategoryName(categories, key) ? <b>{findCategoryName(categories, key)}</b> : ''}
              {categorisedHabits[key].map(habit => (
              <div key={habit.id + habit.achieved} className="mb-12 last:mb-6">
                <Habit habit={habit} completeHabit={updateHabit} />
              </div>
              ))}
            </div>
          ))}
          {uncategorisedHabits?.length && <b>Uncategorised Habits</b>}
          {uncategorisedHabits.map(habit => (
            <div key={habit.id + habit.achieved} className="mb-12 last:mb-6">
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
