import db from './fire';

export function getFormattedDate(dateObj) {
  return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
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
  const querySnapshot = await db
    .collection('habits')
    .where('deleted', '==', false)
    .get();
  querySnapshot.forEach(habit => {
    habits.push({ habit: habit.id, ...habit.data() });
  });

  // Pick the numbHabits randomly
  for (let x = 0; x < habits.length < numbHabits ? habits.length : numbHabits; x++) {
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

function isDateContainedInDays(days, workingDate) {
  return days.some(day => day.date === workingDate);
}

export async function addMissingDays(days) {
  // find the oldest day; assume array already sorted
  const today = new Date();
  if (!days || !days.length) {
    // No day at all, just add today
    db.collection('days').add({
      date: getFormattedDate(today),
      habits: await getHabitsForDay(3)
    });
    return true;
  }

  let oldestDay = days[days.length - 1].date;
  let workingDate = new Date(oldestDay);
  const formattedToday = getFormattedDate(today);
  const daysToGenerate = [];

  // todo: would rather do this with a date comparison, but the creation times will throw off a predictable comparison
  while (getFormattedDate(workingDate) !== formattedToday) {
    if (workingDate > new Date()) throw new Error('Working date is later than today');

    workingDate.setDate(workingDate.getDate() + 1);
    if (!isDateContainedInDays(days, getFormattedDate(workingDate))) {
      daysToGenerate.push({
        date: getFormattedDate(workingDate),
        habits: await getHabitsForDay(3)
      });
    }
  }

  // Now add all the days we want to add inside a batch event
  if (daysToGenerate.length) {
    const batch = db.batch();
    daysToGenerate.forEach(day => {
      const dayRef = db.collection('days').doc();
      batch.set(dayRef, day);
    });
    await batch.commit();
    db.collection('days');
    return true;
  }

  return false;
}

export function getLongestStreak(days) {
  if (!days || !days.length) return 0;

  // Loop over array.
  // Count the streak. Every time a day is not complete then store the current streak if greater than the current highest streak
  let currentLongestStreak = 0;
  let workingStreak = 0;

  for (let x = 0; x < days.length; x++) {
    if (days[x].totalHabits === days[x].achievedHabits) {
      workingStreak++;
    } else {
      if (workingStreak > currentLongestStreak) currentLongestStreak = workingStreak;
      workingStreak = 0;
    }
  }

  return workingStreak > currentLongestStreak ? workingStreak : currentLongestStreak;
}

export function getCurrentStreak(days) {
  // Assume days array already organised into most recent first
  if (!days || !days.length) return 0;
  console.log(days[0]);
  let count = 0;
  let day = days[0];
  while (day.totalHabits === day.achievedHabits) {
    count++;
    if (!days[count]) break;
    day = days[count];
  }

  return count;
}
