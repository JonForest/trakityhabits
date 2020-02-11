import React, { useState, useEffect, useMemo } from 'react';
import db, { getUser } from '../../../../fire';

export default function HabitSettings({categoryId = null}) {
  const { uid } = getUser();
  const [numbHabits, setNumberHabits] = useState(3);
  const ref = useMemo(() => {
    return categoryId ? db.collection(`users/${uid}/categories`).doc(categoryId) : db.collection(`users`).doc(uid)
  }, [categoryId]);

  useEffect(() => {
    return ref.onSnapshot(doc => {
      if (!doc.exists) return;
      const { numbHabits: savedNumberHabits } = doc.data();
      if (savedNumberHabits) setNumberHabits(savedNumberHabits);
    });
  }, [setNumberHabits, uid, categoryId, ref]);

  function saveNumbHabits(e) {
    e.preventDefault();
    const val = parseInt(e.currentTarget.value);
    if (val > 10) {
      e.currentTarget.value = 10;
      return;
    }
    ref.set({ numbHabits: val });
  }

  // Need this function to handle the onChange event, which we need if we use the "value" attr in the input
  function habitChange(e) {
    e.preventDefault();
    setNumberHabits(Number(e.currentTarget.value));
  }

  return (
    <div className="text-left flex">
      <div className="w-3/4">Number of exercises per day (10 max)</div>
      <div className="w-1/4 text-right mb-8 pr-6">
        <input
          type="text"
          className="border w-8 text-center"
          value={numbHabits}
          onChange={habitChange}
          onBlur={saveNumbHabits}
        />
      </div>
    </div>
  );
}
