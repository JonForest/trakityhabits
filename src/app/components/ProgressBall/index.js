import React from 'react';

const getUid = function() {
  return (
    Date.now().toString(36) +
    Math.random()
      .toString(36)
      .substr(2)
  );
};

/**
 * Renders a ProgressBall and animates it forward.
 * The solution is kind of gross, but it is all in css and doesn't need a React animation library to work.
 * TODO: Investigate React animation options at some point in the future 
 */
export default function ProgressBall({ value, percentage, animationDuration=3 }) {
  const width = (percentage / 100) * 30 + 'rem';
  const uid = getUid();
  const scoreClassName = `score${uid}`;
  const moveleft = `moveleft${uid}`;
  const grow = `grow${uid}`;

  return (
    <>
      <style>
        {`
          :root {
            --border: 0.3rem;
            --radius: 3rem;
          }

          .${scoreClassName} {
            /* Features of circle */
            border: var(--border) solid blue;
            border-radius: 100%;
            background: lightblue;
            display: inline-block;
            position: relative;
            margin-left: ${width};

            /* size of circle */
            height: var(--radius);
            width: var(--radius);

            /* positioning of text inside circle */
            line-height: 2.3rem;
            font-size: 2rem;
            text-align: center;

            /* animation details */
            animation-name: ${moveleft};
            animation-duration: ${animationDuration}s;
          }

          .${scoreClassName}::before {
            content: '';
            position: absolute;
            height: var(--border);
            background: blue;
            width: calc(${width} + var(--border));
            left: calc(-1 * (${width} + var(--border))); 
            top: 1.1rem;

            /* animation details */
            animation-name: ${grow};
            animation-duration: ${animationDuration}s;
          }

          @keyframes ${moveleft} {
            from {margin-left: 0;}
            to {margin-left: ${width}; } 
          }

          @keyframes ${grow} {
            from {width: 0; left: 0;}
            to {width: calc(${width} + var(--border)); left: calc(-1 * (${width} + var(--border)));}
          }
        `}
      </style>
      <div className={scoreClassName}>{value}</div>
    </>
  );
}
