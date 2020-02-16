import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import db, { getUser } from '../../../../fire';

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
      category: { value: categoryId }
    } = e.currentTarget.elements;

    if (!description || !description.trim()) {
      updateRequired(true);
      return false;
    }

    const newHabit = {
      description,
      detail,
      categoryId: categoryId === -1 ? null : categoryId,
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
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
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
