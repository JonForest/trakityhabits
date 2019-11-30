import {getFormattedDate} from '../utils';


export function summaryData(numberOfDays, maxHabitsPerDay=3, minHabitsPerDay=3) {
  if (!numberOfDays) throw new Error('Must provide "numberOfDays" parameter to "summaryData" call');
  
  const today = new Date();
  const daysData = [];

  for (let x=0; x<numberOfDays; x++) {
    const dayDate = new Date(new Date(today).setDate(today.getDate() - x));
    daysData.push({
      date: getFormattedDate(dayDate),
      totalHabits: randomNumberInRange(maxHabitsPerDay, minHabitsPerDay),
      achievedHabits: randomNumberInRange(maxHabitsPerDay, 0)        
    })
  }
  return daysData;
};




function randomNumberInRange(inclusiveMax, inclusiveMin=0) {
  const workingMax = (inclusiveMax + 1) - inclusiveMin;
  const workingRandom = Math.floor(Math.random() * workingMax);
  return workingRandom + inclusiveMin;
}