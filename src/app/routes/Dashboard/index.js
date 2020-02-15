import React, { useState, useEffect } from 'react';
import db, { getUser } from '../../../fire';
import Progress from './components/Progress';
import Layout from '../../components/Layout';
import { getFormattedDate, addMissingDays, getCurrentStreak, getLongestStreak } from '../../../utils';
import ProgressChart from '../../components/ProgressChart';

export default function Dashboard() {
  const [days, updateDays] = useState([]);
  const [numbDays, updateNumbDays] = useState(20);
  const [currentStreak, updateCurrentStreak] = useState(undefined);
  const [longestStreak, updateLongestStreak] = useState(undefined);

  const { uid } = getUser();
  // TODO: Switch this to using one of the async-aware effect libraries or patterns ('Suspense'?)
  useEffect(() => {
    return db
      .collection(`users/${uid}/days`)
      .orderBy('date', 'desc')
      .limit(numbDays)
      .onSnapshot(async querySnapshot => {
        const days = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();

          const day = {
            date: data.date,
            totalHabits: data.habits.length,
            achievedHabits: data.habits.filter(habit => habit.achieved).length
          };
          days.push(day);
        });

        if (!(await addMissingDays(days))) {
          updateDays(days);
          updateCurrentStreak(getCurrentStreak(days));
          updateLongestStreak(getLongestStreak(days));
        }
      });
  }, [updateDays, updateCurrentStreak, numbDays, uid]);

  return (
    <Layout title="Dashboard" linkTo={getFormattedDate(new Date())} linkText="See Today">
      <div className="flex">
        <div className="flex-grow" />
        <div className="flex-grow-0 w-11/12 md:w-4/6 xl:w-1/6">
          Show last:
          <ul className="mb-4">
            <li className="inline pr-4">{numbDays === 10 ? 10 : <button className="text-blue-600 underline" onClick={() => updateNumbDays(10)}>10</button>}</li>
            <li className="inline pr-4">{numbDays === 20 ? 20 : <button className="text-blue-600 underline" onClick={() => updateNumbDays(20)}>20</button>}</li>
            <li className="inline">{numbDays === 30 ? 30 : <button className="text-blue-600 underline" onClick={() => updateNumbDays(30)}>30</button>}</li>
          </ul>
          {currentStreak !== undefined && <Progress currentStreak={currentStreak} longestStreak={longestStreak} />}
        </div>
        <div className="flex-grow" />
      </div>
      <ProgressChart days={days} />
    </Layout>
  );
}
