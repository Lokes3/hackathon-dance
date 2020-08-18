import React, { useState, useRef } from 'react';
import { Position } from './types';
type Props = {
  positions: Position[];
  dimensions: {
    rows: number;
    columns: number;
  };
  dispatch: Function;
};
export function MainGrid({ positions, dimensions, dispatch }: Props) {
  const [selectedDancer, setSelectedDancer] = useState(null);
  const { rows, columns } = dimensions;
  const canvasWidth = columns * 2 + 1;
  const canvasHeight = rows * 2 + 1;
  const rowLines = new Array(rows).fill(0).map((_, i) => (i + 1) * 2);
  const columnLines = new Array(columns).fill(0).map((_, i) => (i + 1) * 2);

  const canvasRef = useRef(null);

  const pixelsToCoord = (x, y) => {
    const {
      width,
      height,
      left,
      top
    } = canvasRef.current.getBoundingClientRect();
    return {
      column: Math.round(((x - left) / width) * canvasWidth),
      row: Math.round(((y - top) / height) * canvasHeight)
    };
  };

  const move = e => {
    if (selectedDancer) {
      const coordinates = pixelsToCoord(e.clientX, e.clientY);
      // console.log(coordinates);
      dispatch({
        type: 'MOVE_DANCER',
        name: selectedDancer,
        coordinates,
        frame: 0
      });
    }
  };

  const selectDancer = e => {
    setSelectedDancer(e.target.dataset.name);
  };
  const deSelectDancer = () => {
    setSelectedDancer(null);
  };

  return (
    <svg
      ref={canvasRef}
      viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
      style={{ border: '1px solid black' }}
      width='100%'
      height='auto'
      onMouseDown={selectDancer}
      onMouseUp={deSelectDancer}
      onMouseMove={move}
    >
      {columnLines.map(line => (
        <line
          key={line}
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
          key={line}
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
          data-name={dancer.name}
          cx={dancer.x}
          cy={dancer.y}
          fill={dancer.color}
          r={0.9}
        />
      ))}
    </svg>
  );
}
