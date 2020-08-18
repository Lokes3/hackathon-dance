import React from 'react';
import { Position } from './types';
type Props = {
  positions: Position[];
  dimensions: {
    rows: number;
    columns: number;
  };
};
export function MainGrid({ positions, dimensions }: Props) {
  const { rows, columns } = dimensions;
  const canvasWidth = columns * 2 + 1;
  const canvasHeight = rows * 2 + 1;
  const rowLines = new Array(rows).fill(0).map((_, i) => (i + 1) * 2);
  const columnLines = new Array(columns).fill(0).map((_, i) => (i + 1) * 2);
  console.log(rowLines);
  return (
    <svg
      viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
      style={{ border: '1px solid black' }}
      width='100%'
      height='auto'
    >
      {columnLines.map(line => (
        <line
          x1={line}
          x2={line}
          y1='0'
          y2={canvasWidth}
          stroke='rgba(0,0,0,0.15)'
          strokeWidth={0.05}
        />
      ))}
      {rowLines.map(line => (
        <line
          x1='0'
          x2={canvasWidth}
          y1={line}
          y2={line}
          stroke='rgba(0,0,0,0.15)'
          strokeWidth={0.05}
        />
      ))}
      {positions.map(dancer => (
        <circle
          key={dancer.name}
          cx={dancer.x}
          cy={dancer.y}
          fill={dancer.color}
          r={0.9}
        />
      ))}
    </svg>
  );
}