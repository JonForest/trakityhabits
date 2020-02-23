import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import db, { getUser } from '../../../../fire';

const week = [
  { label: 'M', id: 'monday' },
  { label: 'T', id: 'tuesday' },
  { label: 'W', id: 'wednesday' },
  { label: 'T', id: 'thursday' },
  { label: 'F', id: 'friday' },
  { label: 'S', id: 'saturday' },
  { label: 'S', id: 'sunday' }
];

export default function HabitForm({ habit = false }) {
  const history = useHistory();
  const [required, updateRequired] = useState(false);
  const [categories, updateCategories] = useState([]);
  const [loading, updateLoading] = useState(true);
  const { uid } = getUser();

  // Fetch categories
  useEffect(() => {
    return db.collection(`users/${uid}/categories`).onSnapshot(querySnapshot => {
      const categoriesArray = [];
      querySnapshot.forEach(doc => {
        categoriesArray.push({ id: doc.id, ...doc.data() });
      });

      updateCategories(categoriesArray);
      updateLoading(false);
    });
  }, [updateCategories, updateLoading, uid]);

  function saveHabit(e) {
    e.preventDefault();
    const {
      description: { value: description },
      detail: { value: detail },
      category: { value: categoryId },
      alwaysInclude: { checked: alwaysInclude }
    } = e.currentTarget.elements;

    if (!description || !description.trim()) {
      updateRequired(true);
      return false;
    }

    // days are a 0 based array from Monday
    const days = [
      e.currentTarget.elements.monday.checked,
      e.currentTarget.elements.tuesday.checked,
      e.currentTarget.elements.wednesday.checked,
      e.currentTarget.elements.thursday.checked,
      e.currentTarget.elements.friday.checked,
      e.currentTarget.elements.saturday.checked,
      e.currentTarget.elements.sunday.checked
    ];

    const newHabit = {
      description,
      detail,
      categoryId: categoryId === -1 ? null : categoryId,
      days,
      alwaysInclude,
      deleted: false
    };

    const savePromise = habit
      ? db
          .collection(`users/${uid}/habits`)
          .doc(habit.id)
          .set(newHabit)
      : db.collection(`users/${uid}/habits`).add(newHabit);

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
            disabled={loading}
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
            disabled={loading}
          />
        </div>
      </div>
      <div className="flex flex-col items-start md:flex-row md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="category">
            Category
          </label>
        </div>
        <div className="w-full md:w-2/3">
          {/*Add a key value in so we render an entirely new select tag when the habit finally loads, otherwise the defaultValue is set when habit is false*/}
          {!loading && (
            <select
              id="category"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              disabled={loading}
              key={habit.categoryId}
              defaultValue={habit ? habit.categoryId : '-1'}
            >
              <option value="-1">No category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.description}
                </option>
              ))}
            </select>
          )}
        </div>
        {/*  Repeating code in here (as in, offer up on these days */}
        {/*  Always show*/}
      </div>
      <div className="flex flex-col items-start md:flex-row md:items-center mb-6">
        <div className="md:w-1/3 inline-block">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="alwaysInclude">
            Always include habit
          </label>
        </div>
        <div className="w-full md:w-2/3 inline-block">
          <input id="alwaysInclude" type="checkbox" defaultChecked={habit.alwaysInclude} />
        </div>
      </div>
      <div className="flex flex-col items-start md:flex-row md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Days</label>
        </div>
        <div className="w-full md:w-2/3 inline-block">
          {!loading &&
            habit &&
            week.map((day, i) => (
              <div key={i} className={`inline-block ${i !== 0 ? 'ml-4' : ''}`}>
                <label htmlFor={day.id}>{day.label}</label>
                <br />
                <input id={day.id} type="checkbox" defaultChecked={!habit.days || habit.days[i]} />
              </div>
            ))}
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
