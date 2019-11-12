import React, { useState, useEffect } from 'react';

export default function Habits({ match: { params: { date }}}) {
	const [habits, updateHabits] = useState([])


	useEffect(() => {
		updateHabits([{
			name: 'Dumb-bell curls'
		}, {
			name: 'Press-ups'
		}, {
			name: 'sit-ups'
		}])
	}, [updateHabits])

	return (
		<>
			<h1>Exercises</h1>
			{habits.map(habit => (
				<h2>{habit.name}</h2>
			))}
		</>
	)
}

// Question: how does the app work out which day has been populated or not?
// Fetches the keys from the filled in elements (can I just fetch keys without everything? Not sure I can)
// Or, have a separate 'completed days' array? (Q. can firebase support an array, or is it a random name:val pair?)