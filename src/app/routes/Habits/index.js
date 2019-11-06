import React, { useState, useEffect } from 'react';

export default function Habits() {
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
