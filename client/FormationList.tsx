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
  border: 1px solid
    ${({ selected }) => {
      return selected ? 'red' : 'black';
    }};
  margin: 4px;
`;

type Props = {
  formations: Formation[];
  dimensions;
  frame: number;
  setFrame: Function;
};
export function FormationList({
  formations,
  dimensions,
  frame,
  setFrame
}: Props) {
  return (
    <Container>
      {formations.map(formation => (
        <Snapshot
          key={formation.index}
          selected={frame === formation.index}
          onClick={() => setFrame(formation.index)}
        >
          <Grid dimensions={dimensions} positions={formation.positions} />
        </Snapshot>
      ))}
    </Container>
  );
}
