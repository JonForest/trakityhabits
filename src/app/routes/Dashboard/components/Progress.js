import React from 'react';
import ProgressBall from '../../../components/ProgressBall';

export default function Progress({ currentStreak, longestStreak }) {
  // Need to calculate the relative lengths of each streak
  // Assume that 5 days will be 100%, unless the longest streak is longer
  const maxValue = longestStreak > 5 ? longestStreak : 5;
  const longestStreakLength = (longestStreak / maxValue) * 100;
  const currentStreakLength = (currentStreak / maxValue) * 100;
  const currentStreakTime = 3 - (2 - ((currentStreak / longestStreak) * 2));

  // todo: will need to lay this out better once we have consistent layout of the progress
  return (
    <div className="flex w-20 flex-col">
      <div>
        <ProgressBall value={longestStreak} percentage={longestStreakLength} animationDuration={3} />
      </div>

      <div>
        <ProgressBall value={currentStreak} percentage={currentStreakLength} animationDuration={currentStreakTime} />
      </div>
    </div>
  );
}
