import db, { getUser } from './fire';

export function getFormattedDate(dateObj) {
  return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1 + '').padStart(2, '0')}-${(
    dateObj.getDate() + ''
  ).padStart(2, '0')}`;
}

export default function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


export async function getHabitsForDay() {
  const { uid } = getUser();
  let selectedHabits = [];
  const habits = [];
  const categories = [];

  const habitsPromise = db
    .collection(`users/${uid}/habits`)
    .where(`deleted`, `==`, false)
    .get();

  const categoryPromise = db
    .collection(`users/${uid}/categories`)
    .get();

  const userPromise = db
    .collection('users')
    .doc(uid)
    .get();

  const [ habitsQuery, categoryQuery, userDoc ] = await Promise.all([habitsPromise, categoryPromise, userPromise]);

  if (!userDoc.exists) return [];

  habitsQuery.forEach(doc => {
    habits.push({id: doc.id, ...doc.data()});
  });

  categoryQuery.forEach(doc => {
    categories.push({id: doc.id, ...doc.data()});
  });

  categories.forEach(cat => {
    const catHabits = habits.filter(habit => habit.categoryId === cat.id);
    selectedHabits = selectedHabits.concat(pickRandomHabits(catHabits, cat.numbHabits));
  });

  const uncategorisedCount = userDoc.data().numbHabits ?? 3;
  const uncatHabits = habits.filter(habit => !habit.categoryId);
  selectedHabits = selectedHabits.concat(pickRandomHabits(uncatHabits, uncategorisedCount));

  return selectedHabits;
}

/**
 * Picks a random set of habits from the array of habits passed in, up to the numbHabits specified, or all the habits
 * whichever is least
 * @param habits
 * @param numbHabits
 * @returns {[]}
 */
function pickRandomHabits(habits, numbHabits) {
  const workingHabits = [...habits];
  const loopAmount = numbHabits > habits.length ? habits.length : numbHabits;
  const selectedHabits = [];

  for (let x = 0; x < loopAmount; x++) {
    const index = getRandomInt(workingHabits.length);
    selectedHabits.push({
      achieved: false,
      ...workingHabits[index]
    });
    // Remove selected element from the array
    workingHabits.splice(index, 1);
  }

  return selectedHabits;
}

function isDateContainedInDays(days, workingDate) {
  return days.some(day => day.date === workingDate);
}

/**
 *
 * @param {Number} days
 * @returns {Promise<boolean>}
 */
export async function addMissingDays(days) {
  const { uid } = getUser();
  // find the oldest day; assume array already sorted
  const today = new Date();
  if (!days || !days.length) {
    // No day at all, just add today
    db.collection(`users/${uid}/days`).add({
      date: getFormattedDate(today),
      habits: await getHabitsForDay()
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
        habits: await getHabitsForDay()
      });
    }
  }

  // Now add all the days we want to add inside a batch event
  if (daysToGenerate.length) {
    const batch = db.batch();
    daysToGenerate.forEach(day => {
      const dayRef = db.collection(`users/${uid}/days`).doc();
      batch.set(dayRef, day);
    });
    await batch.commit();
    return true;
  }

  return false;
}

/**
 * NEW GET HABITS
 *
 * Get all category documents
 * Get the uncategorised amount
 *
 * Get all habits
 * for each category
 *   filter habits by category
 *   select number based on category amount
 *   add to returnHabits array
 *
 * for all habits without a category
 *   select number base on uncategorised amount
 */

export function getLongestStreak(days) {
  if (!days || !days.length) return 0;

  // Loop over array.
  // Count the streak. Every time a day is not complete then store the current streak if greater than the current highest streak
  let currentLongestStreak = 0;
  let workingStreak = 0;

  for (let x = 0; x < days.length; x++) {
    // The day must have some habits to form a streak
    if (days[x].totalHabits === 0) {
      workingStreak = 0;
    } else if (days[x].totalHabits === days[x].achievedHabits) {
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

  let count = 0;
  let day = days[0];

  // Check the first day has some habits
  if (day.totalHabits === 0) return 0;

  while (day.totalHabits === day.achievedHabits) {
    count++;
    if (!days[count]) break;
    day = days[count];
  }

  return count;
}

  /**
   * From the category id, returns either false if the category is not loaded or present, or the name of the category
   * @param {Array} categories - array of category objects
   * @param id
   * @returns {boolean|*}
   */
  export function findCategoryName (categories, id) {
    if (!categories?.length) return false;

    const foundCategory = categories.find(cat => cat.id === id);
    return foundCategory ? foundCategory.description : false;
  }