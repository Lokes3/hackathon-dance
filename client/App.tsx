import * as React from 'react';
import styled from 'styled-components';
import { Grid } from './Grid';
import { FormationList } from './FormationList';

const Page = styled.div`
  min-height: calc(100vh - 4rem);
  max-width: 1080px;
  display: grid;
  grid-template-columns: 1fr auto;
  border: 1px solid black;
  margin: 2rem;
`;

const data = {
  title: 'Min första lista',
  choreography: [
    {
      index: 0,
      description: 'raise your hands',
      positions: [
        {
          name: 'A',
          x: 3,
          y: 3,
          color: 'red'
        },
        {
          name: 'B',
          x: 5,
          y: 3,
          color: 'green'
        },
        {
          name: 'C',
          x: 7,
          y: 3,
          color: 'blue'
        }
      ]
    },
    {
      index: 1,
      description: 'raise your hands',
      positions: [
        {
          name: 'A',
          x: 3,
          y: 5,
          color: 'red'
        },
        {
          name: 'B',
          x: 5,
          y: 5,
          color: 'green'
        },
        {
          name: 'C',
          x: 7,
          y: 5,
          color: 'blue'
        }
      ]
    }
  ],
  id: 1
};

const App = () => {
  return (
    <Page>
      <div>
        <Grid />
      </div>
      <FormationList formations={data.choreography} />
    </Page>
  );
};

export default App;
