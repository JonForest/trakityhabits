import React from 'react';
import db, { getUser } from '../../../fire';

export default function HabitResult({ category }) {
  function deleteCategory(category) {
    const { uid } = getUser();
    db.collection(`users/${uid}/categories`)
      .doc(category.id)
      .delete();
  }
  return (
    <>
      <div className="flex mb-6 text-left">
        <div className="w-3/4">
          <div className="font-bold">{category.description}</div>
        </div>
        <div className="flex-shrink-0 w-1/4 ml-3 text-right">
          <button
            className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 my-1 px-4 rounded h-10"
            onClick={() => deleteCategory(category)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
