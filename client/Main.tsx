import React, { useState } from 'react';
import styled from 'styled-components';
import { MainGrid } from './MainGrid';

const Container = styled.div``;

export function Main({ formations, dimensions, dispatch, frame, setFrame }) {
  const formation = formations[frame];
  const [title, setTitle] = useState(formation.description);
  const changeTitle = e => {
    setTitle(e.target.value);
  };
  const incrementFrame = () => {
    if (frame < formations.length - 1) {
      setFrame(frame + 1);
    }
  };
  const decrementFrame = () => {
    if (frame - 1 >= 0) {
      setFrame(frame - 1);
    }
  };
  const addFrame = () => {
    dispatch({ type: 'ADD_FRAME' });
  };
  return (
    <Container>
      <h3>
        <input value={title} onChange={changeTitle} />
      </h3>
      <div>
        Frame: {frame + 1}/{formations.length}{' '}
        <button onClick={decrementFrame}>{'<'}</button>{' '}
        <button onClick={incrementFrame}>{'>'}</button>{' '}
        <button onClick={addFrame}>Add Frame</button>
      </div>
      <MainGrid
        positions={formation.positions}
        dimensions={dimensions}
        dispatch={dispatch}
        frame={formation.index}
      />
    </Container>
  );
}
