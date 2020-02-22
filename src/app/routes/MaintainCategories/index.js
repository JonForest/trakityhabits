import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import CategoryResult from '../../components/CategoryResult';
import db, { getUser } from '../../../fire';
import { DEFAULTS } from '../../../constants';

export default function MaintainCategories() {
  const [categories, updateCategories] = useState([]);
  const { uid } = getUser();

  useEffect(() => {
    const unsubscribe = db.collection(`users/${uid}/categories`).onSnapshot(querySnapshot => {
      const categoriesArray = [];
      querySnapshot.forEach(doc => {
        categoriesArray.push({ id: doc.id, ...doc.data() });
      });
      updateCategories(categoriesArray);
    });
    return unsubscribe;
  }, [updateCategories, uid]);

  /**
   * Add and save a category to the database
   * @param {Event} e
   * @returns {boolean}
   */
  function addCategory(e) {
    e.preventDefault();
    let {
      newCategory: { value: newCategory }
    } = e.currentTarget.elements;

    newCategory = newCategory.trim();
    if (!newCategory || categories.some(cat => cat.description === newCategory)) {
      e.currentTarget.newCategory.value = '';
      return false;
    }

    const catObj = {
      description: newCategory,
      numbHabits: DEFAULTS.EXERCISES_IN_CATEGORY
    };

    db.collection(`users/${uid}/categories`).add(catObj);

    // Reset the input box back to empty
    e.currentTarget.newCategory.value = '';
  }

  return (
    <Layout title="Maintain Categories" linkText="See dashboard" linkTo="/">
      <div className="flex justify-center">
        <div className="flex max-w-lg flex-col px-4 w-11/12 md:w-4/6 xl:w-2/6">
          {categories.map(category => (
            <CategoryResult key={category.id} category={category} />
          ))}

          <form className="flex items-center" onSubmit={addCategory}>
            <div className="w-8/12">
              <input type="text" className="border" id="newCategory" />
            </div>
            <div className="w-4/12 text-right">
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 my-1 px-4 rounded"
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
