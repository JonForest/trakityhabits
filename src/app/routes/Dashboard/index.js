import React, {useState, useEffect, useDebugValue} from 'react';
import {Link} from 'react-router-dom';
import db from '../../../fire';
import Header from '../../components/Header';
import Day from '../../components/Day';
import {summaryData} from '../../../tests/testData';
import {getFormattedDate} from '../../../utils';

export default function Dashboard() {
  const [days, updateDays] = useState([]);

	useEffect(() => {
    const unsubscribe = db.collection('days').orderBy('date').onSnapshot((querySnapshot) => {
      const days = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        const day = {
          date: data.date,
          totalHabits: data.habits.length,
          achievedHabits: data.habits.filter(habit => habit.achieved).length
        };
        days.push(day);
      })
      updateDays(days);
    })

    return unsubscribe;
	}, [updateDays]);

  return (
    <div className="flex flex-col items-stretch h-full">
			<Header className="flex-shrink-0"/>
      <div className="bg-blue-100 w-full h-64"></div>
			<div className="flex justify-center">
        <div className="flex max-w-lg flex-wrap">
          {days.map((day, i)   => <Day key={i} day={day} />)}
        </div>
      </div>
      <div className="flex-grow"></div>
			<footer className="w-100 bg-teal-700 flex-shrink-0 flex justify-center py-2">
				<Link to={getFormattedDate(new Date())} className="text-xl tracking-widest text-white underline lg:text-2x lg:text-teal-100 lg:focus:text-white lg:no-underline lg:hover:text-white lg:hover:underline">See today</Link>
			</footer>
    </div>
  )
}
