import React, { useState, useEffect } from 'react';
import db, { getUser } from '../../../fire';
import Progress from './components/Progress';
import Layout from '../../components/Layout';
import { getFormattedDate, addMissingDays, getCurrentStreak, getLongestStreak } from '../../../utils';
import ProgressChart from '../../components/ProgressChart';

export default function Dashboard() {
  const [days, updateDays] = useState([]);
  const [currentStreak, updateCurrentStreak] = useState(undefined);
  const [longestStreak, updateLongestStreak] = useState(undefined);

  const { uid } = getUser();

  // TODO: Switch this to using one of the async-effect libraries or patterns ('Suspense'?)
  useEffect(() => {
    const unsubscribe = db
      .collection(`users/${uid}/days`)
      .orderBy('date', 'desc')
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

    return unsubscribe;
  }, [updateDays, updateCurrentStreak, uid]);

  return (
    <Layout title="Dashboard" linkTo={getFormattedDate(new Date())} linkText="See Today">
      <div className="flex">
        <div className="flex-grow"></div>
        <div className="flex-grow-0 w-11/12 md:w-4/6 xl:w-1/6">
          {currentStreak !== undefined && <Progress currentStreak={currentStreak} longestStreak={longestStreak} />}
        </div>
        <div className="flex-grow"></div>
      </div>
      <ProgressChart days={days} />
    </Layout>
  );
}
/**
 * todo: remove
 *       {currentStreak !== undefined && <Progress currentStreak={currentStreak} longestStreak={longestStreak} />}
      <ProgressChart />
      <div className="bg-blue-100 w-full h-64 flex justify-center"></div>
      <div className="flex justify-center">
        <div className="flex max-w-lg flex-wrap">
          {days.map((day, i) => (
            <Day key={i} day={day} />
          ))}
        </div>
      </div>

 */
