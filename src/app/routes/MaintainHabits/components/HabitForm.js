import React, { useState } from 'react';
import db from '../../../../fire';

export default function HabitForm({ history, habit = false }) {
  const [required, setRequired] = useState(false);

  function saveHabit(e) {
    e.preventDefault();
    const {
      description: { value: description },
      detail: { value: detail }
    } = e.currentTarget.elements;

    if (!description || !description.trim()) {
      setRequired(true);
      return false;
    }

    const newHabit = {
      description,
      detail,
      deleted: false
    };

    const savePromise = habit
      ? db
          .collection('habits')
          .doc(habit.id)
          .set(newHabit)
      : db.collection('habits').add(newHabit);

    savePromise.then(() => {
      history.push('/maintain');
    });
  }
  return (
    <form className="flex flex-col w-11/12 md:w-4/6 xl:w-2/6" onSubmit={saveHabit}>
      <div className="flex flex-col items-start md:flex-row md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="description">
            Description
          </label>
        </div>
        <div className="w-full md:w-2/3">
          <input
            className={
              // todo: this does not work
              'bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ' +
              (required ? 'border-red-400' : 'border-gray-200')
            }
            id="description"
            type="text"
            defaultValue={habit ? habit.description : ''}
          />
        </div>
      </div>
      <div className="flex flex-col items-start md:flex-row md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
            Details
          </label>
        </div>
        <div className="w-full md:w-2/3">
          <textarea
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="detail"
            defaultValue={habit ? habit.detail : ''}
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-teal-700 hover:bg-teal-900 text-teal-100 hover:text-white hover:underline font-bold py-2 my-1 px-4 rounded h-10 tracking-widest"
      >
        Save habit
      </button>
    </form>
  );
}
