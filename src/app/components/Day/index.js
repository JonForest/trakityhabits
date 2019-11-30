import React from 'react';
import {Link} from 'react-router-dom';

export default function Day({day}) {
  const backgroundColour = day.totalHabits === day.achievedHabits ? 'bg-green-700' : 'bg-red-400'
  return (
    <Link to={`/${day.date}`} className={`${backgroundColour} flex-shrink-0 h-6 w-6 m-1`} />
  )
}
