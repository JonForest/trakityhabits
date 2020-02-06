import React from 'react';
import ProgressBall from '../../../components/ProgressBall';

// todo: only render if the currentStreak or longestStreak are different to the last render
export default function Progress({ currentStreak, longestStreak }) {
  // Need to calculate the relative lengths of each streak
  // Assume that 5 days will be 100%, unless the longest streak is longer
  const maxValue = longestStreak > 5 ? longestStreak : 5;
  const longestStreakLength = (longestStreak / maxValue) * 100;
  const currentStreakLength = (currentStreak / maxValue) * 100;
  const currentStreakTime = 3 - (2 - (currentStreak / longestStreak) * 2);

  // todo: will need to lay this out better once we have consistent layout of the progress
  return (
    <div className="flex w-20 flex-col w-full text-left mb-8">
      <div className="flex w-full">
        <div className="w-3/12 flex-shrink-0 pr-3">Longest streak</div>
        <div className="w-9/12 flex-grow-0 pl-2">
          <ProgressBall value={longestStreak} percentage={longestStreakLength} animationDuration={3} />
        </div>
      </div>

      <div className="flex w-full content-start">
        <div className="w-3/12 flex-shrink-0 pr-3">Current streak</div>
        <div className="w-9/12 flex-grow-0 pl-2">
          <ProgressBall value={currentStreak} percentage={currentStreakLength} animationDuration={currentStreakTime} />
        </div>
      </div>
    </div>
  );
}

/**
 *           <ProgressBall value={longestStreak} percentage={longestStreakLength} animationDuration={3} />

 */
