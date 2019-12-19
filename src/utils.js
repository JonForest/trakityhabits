import db from './fire';

export function getFormattedDate(dateObj) {
  return  `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
}


export default function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
} 

/**
 * Returns a given number of habits in the format to be added to a new day
 * @param {Number} numbHabits 
 */
export async function getHabitsForDay(numbHabits) {
  const habits = [];
  const selectedHabits = [];
  // Get all possible habits from firebase
  const querySnapshot = await db.collection('habits').get();
  querySnapshot.forEach(habit => {
    habits.push({habit: habit.id, ...habit.data()});
  })

  // Pick the numbHabits randomly
  for (let x=0; x < habits.length < numbHabits ? habits.length : numbHabits; x++) {
    const index = getRandomInt(habits.length);
    selectedHabits.push({
      achieved: false,
      ...habits[index]
    });
    // Remove selected element from the array
    habits.splice(index, 1);
  }

  return selectedHabits;
}

export async function createToday() {
  const today = new Date();
  const todaysHabits = {
    date: getFormattedDate(today),
    habits: await getHabitsForDay(3)
  };

  await db.collection('days').add(todaysHabits);
  return;
}