import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import db, { getUser } from '../../../fire';

export default function MaintainCategories() {
  const [categories, updateCategories] = useState(new Set());
  const { uid } = getUser();

  useEffect(() => {
    const unsubscribe = db
      .collection(`users`)
      .doc(uid)
      .onSnapshot(doc => {
        if (!doc.exists) return;
        const { categories = []} = doc.data();
        if (categories) updateCategories(new Set(categories));
      });
    return unsubscribe;
  }, [updateCategories, uid]);

  function addCategory(e) {
    e.preventDefault();
   let {
      newCategory: { value: newCategory }
    } = e.currentTarget.elements;

    if (!newCategory || !newCategory.trim()) {
      return false;
    }

    categories.add(newCategory);

    db.collection('users')
      .doc(uid)
      .set({ categories: [...categories] });

    // Reset the input box back to empty
    e.currentTarget.newCategory.value = '';
  }

  return (
    <Layout title="Maintain Categories" linkText="See dashboard" linkTo="/">
      <div className="flex justify-center">
        <div className="flex max-w-lg flex-col px-4 w-11/12 md:w-4/6 xl:w-2/6">

          {[...categories].map(category => (
            <div>{category}</div>
          ))}

          <form className="flex items-center" onSubmit={addCategory}>
            <div className="w-8/12">
              <input type="text" className="border" id="newCategory" />
            </div>
            <div className="w-4/12">
              <button type="submit"
                className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 my-1 px-4 rounded h-10"
              >
                Add Category
              </button>
            </div>
          </form>

        </div>
      </div>
    </Layout>
  );
}
