import React from 'react';
import Day from '../Day';

export default function ProgressChart({ days }) {
  console.log(days);
  const numbRows = Math.ceil(days / 7);
  const startPosition = days[0] ? new Date(days[0].date).getDay() : 7;
  const cells = [];

  // Pad blank sections at the start
  while (true) {
    if (cells.length === startPosition) {
      break;
    } else {
      cells.push(<div class="bg-gray-300 flex-shrink-0 h-6 w-6 m-1"></div>);
    }
  }

  days.forEach(day => {
    // todo: somewhere it would be good to check our data is solid, and that the dates in the days match the expected
    // date of the cell
    cells.push(<Day day={day} />);
  });

  // Pad the end
  for (let x = 0; x < cells.length % 7; x++) {
    //cells.push(<div class="bg-gray-300 flex-shrink-0 h-6 w-6 m-1"></div>);
    cells.push(null);
  }

  // split into rows and columns
  const columns = cells.reduce((cols, cell, index) => {
    if (index % 7 === 0) {
      cols.push([cell]);
    } else {
      cols[cols.length - 1].push(cell);
    }
    return cols;
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>S</th>
          <th>M</th>
          <th>T</th>
          <th>W</th>
          <th>T</th>
          <th>F</th>
          <th>S</th>
        </tr>
      </thead>
      <tbody>
        {columns.map(col => (
          <tr>
            {col.map(cell => (
              <td>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
