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
  dimensions: {
    rows: 12,
    columns: 16
  },
  choreography: [
    {
      index: 0,
      description: 'raise your hands',
      positions: [
        {
          name: 'A',
          x: 13,
          y: 11,
          color: 'red'
        },
        {
          name: 'B',
          x: 17,
          y: 21,
          color: 'green'
        },
        {
          name: 'C',
          x: 21,
          y: 11,
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
          x: 13,
          y: 17,
          color: 'red'
        },
        {
          name: 'B',
          x: 17,
          y: 17,
          color: 'green'
        },
        {
          name: 'C',
          x: 21,
          y: 17,
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
      <div>{/* <Grid /> */}</div>
      <FormationList
        dimensions={data.dimensions}
        formations={data.choreography}
      />
    </Page>
  );
};

export default App;
