import React, { useState, useEffect } from 'react';
import Habit from '../../components/Habit';
import Header from '../../components/Header';
import styles from './Habits.module.css';

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
		<>
			<Header />
			<div className="flex justify-center mt-6">
				<div>
					{/* <div className={styles.date_slider}></div> */}
					<div className="flex flex-col">
						{habits.map(habit => (
							<div key={habit.id} className="mb-6">
								<Habit habit={habit} completeHabit={updateHabit} />
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

// Question: how does the app work out which day has been populated or not?
// Fetches the keys from the filled in elements (can I just fetch keys without everything? Not sure I can)
// Or, have a separate 'completed days' array? (Q. can firebase support an array, or is it a random name:val pair?)