import React, { useState, useReducer } from 'react';
import styled from 'styled-components';
import { FormationList } from './FormationList';
import { Main } from './Main';
import data from '../test_data.json';

const Page = styled.div`
  min-height: calc(100vh - 4rem);
  max-width: 1080px;
  display: grid;
  grid-template-columns: 1fr auto;
  border: 1px solid black;
  margin: 2rem;
`;

const stateReducer = (state, action) => {
  switch (action.type) {
    case 'MOVE_DANCER':
      const { name, coordinates, frame } = action;
      const { choreography } = state;
      const { positions } = choreography[frame];
      const dancerIndex = positions.findIndex(dancer => dancer.name === name);
      const newDancer = {
        ...positions[dancerIndex],
        x: coordinates.column,
        y: coordinates.row
      };
      const newPositions = [
        ...positions.slice(0, dancerIndex),
        newDancer,
        ...positions.slice(dancerIndex + 1)
      ];
      const newFormation = { ...choreography[frame], positions: newPositions };
      const newChoreography = [
        ...choreography.slice(0, frame),
        newFormation,
        ...choreography.slice(frame + 1)
      ];
      return { ...state, choreography: newChoreography };
    default:
      return state;
  }
};

const App = () => {
  const [frame, setFrame] = useState(0);
  const [state, dispatch] = useReducer(stateReducer, data);
  return (
    <Page>
      <Main
        dimensions={state.dimensions}
        formations={state.choreography[frame]}
        dispatch={dispatch}
      />
      <FormationList
        dimensions={state.dimensions}
        formations={state.choreography}
      />
    </Page>
  );
};

export default App;
