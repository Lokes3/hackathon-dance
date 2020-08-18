import React, { useState } from 'react';
import styled from 'styled-components';
import { MainGrid } from './MainGrid';

const Container = styled.div``;

export function Main({ formations, dimensions }) {
  const [title, setTitle] = useState(formations.description);
  const changeTitle = e => {
    setTitle(e.target.value);
  };
  return (
    <Container>
      <h3>
        <input value={title} onChange={changeTitle} />
      </h3>
      <MainGrid positions={formations.positions} dimensions={dimensions} />
    </Container>
  );
}
