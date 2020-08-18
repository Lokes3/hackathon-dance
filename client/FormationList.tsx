import React from 'react';
import styled from 'styled-components';
import { Formation } from './types';
import { Grid } from './Grid';

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

type Props = {
  formations: Formation[];
  dimensions
};
export function FormationList({ formations, dimensions }: Props) {
  return (
    <Container>
      {formations.map(formation => (
        <Snapshot key={formation.index}>
          <Grid dimensions={dimensions} positions={formation.positions} />
        </Snapshot>
      ))}
    </Container>
  );
}
