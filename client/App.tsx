import React, { useState, useReducer } from 'react';
import styled from 'styled-components';
import { FormationList } from './FormationList';
import { Main } from './Main';
import data from '../test_data_dummy_algo.json';

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
    case 'SET_STATE': {
      console.log(action);
      return action.state;
    }
    case 'MOVE_DANCER': {
      const { name, coordinates, frame } = action;
      const { choreography } = state;
      const { positions } = choreography[frame];
      const dancerIndex = positions.findIndex((dancer) => dancer.name === name);
      const newDancer = {
        ...positions[dancerIndex],
        x: coordinates.column,
        y: coordinates.row,
      };
      const newPositions = [
        ...positions.slice(0, dancerIndex),
        newDancer,
        ...positions.slice(dancerIndex + 1),
      ];
      const newFormation = { ...choreography[frame], positions: newPositions };
      const newChoreography = [
        ...choreography.slice(0, frame),
        newFormation,
        ...choreography.slice(frame + 1),
      ];
      return { ...state, choreography: newChoreography };
    }
    case 'CHANGE_NAME': {
      const { description, frame } = action;
      const { choreography } = state;
      const newFormation = { ...choreography[frame], description };
      const newChoreography = [
        ...choreography.slice(0, frame),
        newFormation,
        ...choreography.slice(frame + 1),
      ];
      return { ...state, choreography: newChoreography };
    }
    case 'ADD_FRAME': {
      const { choreography } = state;
      const lastFrame = choreography[choreography.length - 1];
      const newFrame = { ...lastFrame, index: lastFrame.index + 1 };
      return { ...state, choreography: [...choreography, newFrame] };
    }
    default:
      return state;
  }
};

export default function App({ data }) {
  const [state, dispatch] = useReducer(stateReducer, data);
  const [frame, setFrame] = useState(0);
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
      <button
        onClick={() => {
          fetch(`/dances/${state.id}/`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              data: state,
            }),
          }).then(() => {
            console.log('computing');
            fetch('/compute/', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(state),
            })
              .then((r) => r.json())
              .then((data) => {
                dispatch({ type: 'SET_STATE', state: data });
              });
          });
        }}
      >
        Save
      </button>
    </Page>
  );
}
