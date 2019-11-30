import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Habit from '../../components/Habit';
import Header from '../../components/Header';

export default function Habits({ match: { params: { date }}}) {
	const [habits, updateHabits] = useState([]);

	function updateHabit (habitId, isComplete) {
		// todo: update habit in Firebase, should get picked up by firebase live query
	};

	useEffect(() => {
		updateHabits([{
			id: 1,
			description: 'Dumb-bell curls',
			detail: 'Use two 15kg weights, standing, one in each hand'
		}, {
			id: 2,
			description: 'Press-ups',
			detail: '3 sets of 15 press-ups'
		}, {
			id: 3,
			description: 'sit-ups',
			detail: '3 sets of 20 sit-ups'
		}])
	}, [updateHabits]);

	return (
		<div className="flex flex-col items-stretch h-full">
			<Header className="flex-shrink-0"/>
			<div className="flex-grow flex justify-center mt-6">
				{/* <div className={styles.date_slider}></div> */}
				<div className="flex max-w-lg flex-col px-4">
					{habits.map(habit => (
						<div key={habit.id} className="mb-6">
							<Habit habit={habit} completeHabit={updateHabit} />
						</div>
					))}
				</div>
			</div>
			<footer className="w-100 bg-teal-700 flex-shrink-0 flex justify-center py-2">
				<Link to="/" className="text-xl tracking-widest text-white underline lg:text-2x lg:text-teal-100 lg:focus:text-white lg:no-underline lg:hover:text-white lg:hover:underline">See dashboard</Link>
			</footer>
		</div>
	);
}

// todo: Question: how does the app work out which day has been populated or not?
// Fetches the keys from the filled in elements (can I just fetch keys without everything? Not sure I can)
// Or, have a separate 'completed days' array? (Q. can firebase support an array, or is it a random name:val pair?)