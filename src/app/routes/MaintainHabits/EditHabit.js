import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import HabitForm from './components/HabitForm';

export default function AddHabit({ history }) {
  return (
    <div className="flex flex-col items-stretch h-full">
      <Header className="flex-shrink-0" />
      <div className="flex-grow-0 flex justify-center mt-6">
        {/* <div className={styles.date_slider}></div> */}
        <h1 className="text-3xl mb-2 text-center">Add Habit</h1>
      </div>
      <div className="flex-grow flex justify-center mt-6">
        <HabitForm history={history} />
      </div>
      <footer className="w-100 bg-teal-700 flex-shrink-0 flex justify-center py-2">
        <Link
          to="/maintain"
          className="text-center w-full text-xl tracking-widest text-white underline lg:text-2x lg:text-teal-100 lg:focus:text-white lg:no-underline lg:hover:text-white lg:hover:underline"
        >
          See habits
        </Link>
      </footer>
    </div>
  );
}
