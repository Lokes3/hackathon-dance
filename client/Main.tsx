import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MainGrid } from './MainGrid';

const Container = styled.div``;

export function Main({ formations, dimensions, dispatch, frame, setFrame }) {
  const formation = formations[frame];
  const [currentPositions, setCurrentPositions] = useState(formation.positions);
  useEffect(() => {
    setCurrentPositions(formation.positions);
  }, [frame, formations]);
  const changeTitle = e => {
    dispatch({
      type: 'CHANGE_NAME',
      frame,
      description: e.target.value
    });
  };
  const incrementFrame = () => {
    if (frame < formations.length - 1) {
      const animationFrames = [
        ...formation.key_frames.map(frames => frames.positions),
        formations[frame + 1].positions
      ];
      let j;
      animationFrames.forEach((frame, i) => {
        setTimeout(() => setCurrentPositions(frame), i * 500);
        j = i;
      });
      setTimeout(() => setFrame(frame + 1), j * 500);
    }
  };
  const decrementFrame = () => {
    if (frame - 1 >= 0) {
      setCurrentPositions(formations[frame - 1].positions);
      setFrame(frame - 1);
    }
  };
  const addFrame = () => {
    dispatch({ type: 'ADD_FRAME' });
  };
  return (
    <Container>
      <h3>
        <input value={formation.description} onChange={changeTitle} />
      </h3>
      <div>
        Frame: {frame + 1}/{formations.length}{' '}
        <button onClick={decrementFrame}>{'<'}</button>{' '}
        <button onClick={incrementFrame}>{'>'}</button>{' '}
        <button onClick={addFrame}>Add Frame</button>
      </div>
      <MainGrid
        positions={currentPositions}
        dimensions={dimensions}
        dispatch={dispatch}
        frame={formation.index}
      />
    </Container>
  );
}
