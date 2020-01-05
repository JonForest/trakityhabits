import React from 'react';
import { Link } from 'react-router-dom';
import db from '../../../fire';

export default function HabitResult({ habit }) {
  function deleteHabit(habit) {
    db.collection('habits')
      .doc(habit.id)
      .update({
        deleted: true
      });
  }
  return (
    <>
      <div className="flex mb-6">
        <div className="w-3/4">
          <div className="font-bold">
            <Link to={`/maintain/edit/${habit.id}`}>{habit.description}</Link>
          </div>
          <div className="text-gray-600">{habit.detail}</div>
        </div>
        <div className="flex-shrink-0 w-1/4 ml-3 text-right">
          <button
            className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 my-1 px-4 rounded h-10"
            onClick={() => deleteHabit(habit)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
