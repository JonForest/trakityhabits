import React, { useState, useEffect } from 'react';
import db, { getUser } from '../../../../fire';

export default function HabitSettings() {
  const { uid } = getUser();
  const [numbHabits, setNumberHabits] = useState(3);

  useEffect(() => {
    return db
      .collection(`users`)
      .doc(uid)
      .onSnapshot(doc => {
        if (!doc.exists) return;
        const { numbHabits: savedNumberHabits } = doc.data();
        if (savedNumberHabits) setNumberHabits(savedNumberHabits);
      });
  }, [setNumberHabits, uid]);

  function saveNumbHabits(e) {
    e.preventDefault();
    const val = parseInt(e.currentTarget.value);
    if (val > 10) {
      e.currentTarget.value = 10;
      return;
    }
    db.collection('users')
      .doc(uid)
      .set({ numbHabits: val });
  }

  // Need this function to handle the onChange event, which we need if we use the "value" attr in the input
  function habitChange(e) {
    e.preventDefault();
    setNumberHabits(e.currentTarget.value);
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
