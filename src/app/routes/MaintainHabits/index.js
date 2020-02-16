import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import HabitResult from '../../components/HabitResult';
import db, { getUser } from '../../../fire';
import HabitSettings from './components/HabitSettings';
import { findCategoryName } from '../../../utils';

export default function MaintainHabits() {
  const [uncategorisedHabits, updateUncategorisedHabits] = useState([]);
  const [categorisedHabits, updateCategorisedHabits] = useState([]);
  const [categories, updateCategories] = useState([]);
  const { uid } = getUser();

  // Fetch habits and split based on category
  useEffect(() => {
    const unsubscribe = db
      .collection(`users/${uid}/habits`)
      .where('deleted', '==', false)
      .onSnapshot(querySnapshot => {
        const uncategorisedHabitsArray = [];
        const habitsObj = {};
        querySnapshot.forEach(doc => {
          const docData = { id: doc.id, ...doc.data() };

          if (docData.categoryId) {
            if (habitsObj[docData.categoryId]) habitsObj[docData.categoryId].push(docData);
            else habitsObj[docData.categoryId] = [docData];
          } else {
            uncategorisedHabitsArray.push(docData);
          }
        });

        updateUncategorisedHabits(uncategorisedHabitsArray);
        updateCategorisedHabits(habitsObj);
      });
    return unsubscribe;
  }, [updateCategorisedHabits, updateUncategorisedHabits, uid]);

  // Fetch categories
  useEffect(() => {
    return db.collection(`users/${uid}/categories`).onSnapshot(querySnapshot => {
      const categoriesArray = [];
      querySnapshot.forEach(doc => {
        categoriesArray.push({ id: doc.id, ...doc.data() });
      });
      updateCategories(categoriesArray);
    });
  }, [updateCategories, uid]);

  return (
    <Layout title="Maintain Habits" linkText="See dashboard" linkTo="/">
      <div className="flex justify-center">
        <div className="flex max-w-lg flex-col px-4 w-11/12 md:w-4/6 xl:w-2/6">
          {Object.keys(categorisedHabits).map(key => (
            <div key={key}>
              {findCategoryName(categories, key) ? <b>{findCategoryName(categories, key)}</b> : ''}
              {categorisedHabits[key].map(habit => (
                <HabitResult key={habit.id} habit={habit} />
              ))}

              <HabitSettings categoryId={key} />
            </div>
          ))}

          {uncategorisedHabits?.length && <b>Uncategorised Habits</b>}
          {uncategorisedHabits.map(habit => (
            <HabitResult key={habit.id} habit={habit} />
          ))}
          <HabitSettings />

          <Link to="/maintain/add">Add a new Habit</Link>
        </div>
      </div>
    </Layout>
  );
}
