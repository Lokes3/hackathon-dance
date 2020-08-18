import React from 'react';
import styled from 'styled-components';
import { Formation } from './types';

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
};
export function FormationList({ formations }: Props) {
  return (
    <Container>
      {formations.map((formation) => (
        <Snapshot>{formation.index}</Snapshot>
      ))}
    </Container>
  );
}
