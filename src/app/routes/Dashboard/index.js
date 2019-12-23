import React, { useState, useEffect, useDebugValue } from 'react';
import { Link } from 'react-router-dom';
import db from '../../../fire';
import Header from '../../components/Header';
import Day from '../../components/Day';
import { getFormattedDate, createToday } from '../../../utils';

/**
 * Adds today if not contained within the days array
 * Ideally this function should not be on the client, rather on the server. Though being on the client does solve some
 * possible timezone related issues, it also runs the risk of a race-condition adding two of today
 * Some could be mitigated by an async aware useEffect (which exists, see Suspends), but even that won't stop the multi
 * device issue
 * @param {[Object]} days
 */
// TODO: This process shouls add all missing days from the first day through to today
async function addTodayIfMissing(days) {
  const today = new Date();
  if (days[0].date !== getFormattedDate(today)) {
    // today is missing, so we need to create it and upload it to Firebase
    // Note: I know this is creating a race-condition, but I believe it should be fine under the circumstances
    createToday();
  }
}

export default function Dashboard() {
  const [days, updateDays] = useState([]);

  // TODO: Swtich this to using one of the async-effect libraruies or patterns ('Suspense'?)
  useEffect(() => {
    const unsubscribe = db
      .collection('days')
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

        await addTodayIfMissing(days);
        updateDays(days);
      });

    return unsubscribe;
  }, [updateDays]);

  return (
    <div className="flex flex-col items-stretch h-full">
      <Header className="flex-shrink-0" />
      <div className="bg-blue-100 w-full h-64"></div>
      <div className="flex justify-center">
        <div className="flex max-w-lg flex-wrap">
          {days.map((day, i) => (
            <Day key={i} day={day} />
          ))}
        </div>
      </div>
      <div className="flex-grow"></div>
      <footer className="w-100 bg-teal-700 flex-shrink-0 flex justify-center py-2">
        <Link
          to={getFormattedDate(new Date())}
          className="text-xl tracking-widest text-white underline lg:text-2x lg:text-teal-100 lg:focus:text-white lg:no-underline lg:hover:text-white lg:hover:underline"
        >
          See today
        </Link>
      </footer>
    </div>
  );
}
