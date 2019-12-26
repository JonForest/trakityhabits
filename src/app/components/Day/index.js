import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from 'react-tooltip-lite';

export default function Day({ day }) {
  const backgroundColour = day.totalHabits === day.achievedHabits ? 'bg-green-700' : 'bg-red-400';
  return (
    <Tooltip content={TooltipContent(day)} useHover={false} eventToggle="onClick">
      <button className={`${backgroundColour} flex-shrink-0 h-6 w-6 m-1`}>&nbsp;</button>
    </Tooltip>
  );
}

function TooltipContent({ date, totalHabits, achievedHabits }) {
  if (!date) return '';
  console.log(arguments);

  return (
    <>
      <h3 className="text-center">{new Date(date).toLocaleDateString('en-NZ')}</h3>
      <dl className="flex flex-wrap mb-6">
        <dt className="w-3/4">Total habits:</dt>
        <dd className="w-1/4">{totalHabits}</dd>
        <dt className="w-3/4">Achieved habits:</dt>
        <dd className="w-1/4">{achievedHabits}</dd>
      </dl>
      <Link
        to={`/${date}`}
        className="hover:bg-gray-600 focus:bg-gray-600 underline px-2 w-full inline-block text-center rounded"
      >
        View Habits
      </Link>
    </>
  );
}
