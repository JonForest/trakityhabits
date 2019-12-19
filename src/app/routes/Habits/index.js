import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import db from '../../../fire';
import Habit from '../../components/Habit';
import Header from '../../components/Header';

export default function Habits({ match: { params: { date }}}) {
	const [habits, updateHabits] = useState([]);

	function updateHabit (habitId, isComplete) {
		db.collection('days').where('date', '==', date).limit(1).get().then(querySnapshot => {
			querySnapshot.forEach(doc => {
				const day = doc.data();
				// Note: used .some here as better supported than .find for IE; though honestly, it's a nasty looking hack
				day.habits.some(habit => {
					if (habit.habit === habitId) { //todo: change to habit.id
						habit.achieved = isComplete;
						return true; 
					} else return false;
				});
				db.collection('days').doc(doc.id).update({
					habits: day.habits
				});
			});
		});
	};

	useEffect(() => {
		const unsubscribe = db.collection('days').where('date', '==', date).limit(1).onSnapshot(querySnapshot => {
			querySnapshot.forEach(doc => {
				// Note, should only ever be one doc
				const day = doc.data();
				const habits = day.habits.map(habit => ({
					id: habit.habit, // todo: removed when changed to habit.id
					...habit
				}));
				updateHabits(habits);
			});
		})
		return unsubscribe;
	}, [updateHabits, date]);

	return (
		<div className="flex flex-col items-stretch h-full">
			<Header className="flex-shrink-0"/>
			<div className="flex-grow flex justify-center mt-6">
				{/* <div className={styles.date_slider}></div> */}
				<div className="flex max-w-lg flex-col px-4">
					{habits.map(habit => (
						<div key={habit.id + habit.achieved} className="mb-6">
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