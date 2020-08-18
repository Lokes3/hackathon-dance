import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border-left: 2px solid black;
  width: 128px;
  display: flex;
  flex-direction: column;
`;

const Snapshot = styled.div`
  border: 1px solid black;
  margin: 4px;
  height: 48px;
`;

export function FormationList({ formations }) {
  return (
    <Container>
      {formations.map(formation => (
        <Snapshot>{formation.index}</Snapshot>
      ))}
    </Container>
  );
}
