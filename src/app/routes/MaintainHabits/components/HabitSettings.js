import React, { useState, useEffect } from 'react';
import db, { getUser } from '../../../../fire';

export default function HabitSettings() {
  const { uid } = getUser();
  const [numbExercises, setNumberExercises] = useState(3);

  useEffect(() => {
    return db
      .collection(`users`)
      .doc(uid)
      .onSnapshot(doc => {
        if (!doc.exists) return;

        const { numbExercises: savedNumbExercises } = doc.data();
        if (savedNumbExercises) setNumberExercises(savedNumbExercises);
      });
  }, [setNumberExercises]);

  function saveNumbExercises(e) {
    e.preventDefault();
    const val = parseInt(e.currentTarget.value);
    if (val > 10) {
      e.currentTarget.value = numbExercises;
      return;
    }
    db.collection('users')
      .doc(uid)
      .set({ numbExercises: val });
  }

  return (
    <div className="text-left flex">
      <div className="w-3/4">Number of exercises per day (10 max)</div>
      <div className="w-1/4 text-right mb-8 pr-6">
        <input type="text" className="border w-8 text-center" defaultValue={numbExercises} onBlur={saveNumbExercises} />
      </div>
    </div>
  );
}
