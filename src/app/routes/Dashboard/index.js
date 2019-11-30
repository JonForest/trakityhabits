import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Header from '../../components/Header';
import Day from '../../components/Day';
import {summaryData} from '../../../tests/testData';
import {getFormattedDate} from '../../../utils';

export default function Dashboard() {
	const [days, updateDays] = useState([]);

	useEffect(() => {
    updateDays(summaryData(100))
	}, [updateDays]);

  return (
    <div className="flex flex-col items-stretch h-full">
			<Header className="flex-shrink-0"/>
			<div className="flex-grow flex justify-center mt-6">
        <div className="flex max-w-lg flex-wrap content-start">
          {days.map((day, i)   => <Day key={i} day={day} />)}
        </div>
      </div>
			<footer className="w-100 bg-teal-700 flex-shrink-0 flex justify-center py-2">
				<Link to={getFormattedDate(new Date())} className="text-xl tracking-widest text-white underline lg:text-2x lg:text-teal-100 lg:focus:text-white lg:no-underline lg:hover:text-white lg:hover:underline">See today</Link>
			</footer>
    </div>
  )
}
