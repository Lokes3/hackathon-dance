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
    case 'ADD_FRAME':
      const { choreography } = state;
      const lastFrame = choreography[choreography.length - 1];
      const newFrame = { ...lastFrame, index: lastFrame.index + 1 };
      return { ...state, choreography: [...choreography, newFrame] };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(stateReducer, data);
  const [frame, setFrame] = useState(1);
  return (
    <Page>
      <Main
        dimensions={state.dimensions}
        formations={state.choreography}
        dispatch={dispatch}
        frame={frame}
        setFrame={setFrame}
      />
      <FormationList
        dimensions={state.dimensions}
        formations={state.choreography}
        frame={frame}
        setFrame={setFrame}
      />
    </Page>
  );
};

export default App;
