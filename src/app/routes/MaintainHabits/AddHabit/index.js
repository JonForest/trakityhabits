import React from 'react';
import Header from '../../../components/Header';
import { Link } from 'react-router-dom';

export default function AddHabit() {
  return (
    <div className="flex flex-col items-stretch h-full">
      <Header className="flex-shrink-0" />
      <div className="flex-grow-0 flex justify-center mt-6">
        {/* <div className={styles.date_slider}></div> */}
        <h1 className="text-3xl mb-2 text-center">Add Habit</h1>
      </div>
      <div className="flex-grow flex justify-center mt-6">
        <div className="flex flex-col w-11/12 md:w-4/6 xl:w-2/6">
          <div className="flex flex-col items-start md:flex-row md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="description">
                Description
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="description"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col items-start md:flex-row md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Details
              </label>
            </div>
            <div className="w-full md:w-2/3">
              <textarea
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="details"
              />
            </div>
          </div>
        </div>
      </div>
      <footer className="w-100 bg-teal-700 flex-shrink-0 flex justify-center py-2">
        <Link
          to="/maintain"
          className="text-xl tracking-widest text-white underline lg:text-2x lg:text-teal-100 lg:focus:text-white lg:no-underline lg:hover:text-white lg:hover:underline"
        >
          See habits
        </Link>
      </footer>
    </div>
  );
}
