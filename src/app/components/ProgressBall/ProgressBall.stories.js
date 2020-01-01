import React from 'react';
import ProgressBall from '.';

const notes = `
# ProgressBall
Animating progress ball
`;

export default {
  title: 'ProgressBall',
  parameters: { notes }
};

export const normal = () => (
  <div style={{ width: '80%' }}>
    <ProgressBall value={5} percentage={70} />
  </div>
);

export const double = () => (
  <>
    <div style={{ width: '80%' }}>
      <ProgressBall value={5} percentage={70} />
    </div>
    <div style={{ width: '80%' }}>
      <ProgressBall value={2} percentage={10} animationDuration={1} />
    </div>
  </>
);
