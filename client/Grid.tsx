import React from 'react';
import { Position } from './types';
import styled from 'styled-components';
type Props = {
  positions: Position[];
  dimensions: {
    rows: number;
    columns: number;
  };
};

export function Grid({ positions, dimensions }: Props) {
  const { rows, columns } = dimensions;
  console.log({ positions });
  return (
    <svg
      viewBox={`0 0 ${rows * 2 + 1} ${columns * 2 + 1}`}
      style={{ border: '1px solid red' }}
      width='100%'
      height='auto'
    >
      {positions.map(dancer => (
        <circle
          key={dancer.name}
          cx={dancer.x}
          cy={dancer.y}
          fill={dancer.color}
          r={1}
        />
      ))}
    </svg>
  );
}
