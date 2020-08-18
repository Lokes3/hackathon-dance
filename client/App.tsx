import * as React from 'react';
import styled from 'styled-components';
import { FormationList } from './FormationList';
import * as data from '../test_data.json';

const Page = styled.div`
  min-height: calc(100vh - 4rem);
  max-width: 1080px;
  display: grid;
  grid-template-columns: 1fr auto;
  border: 1px solid black;
  margin: 2rem;
`;

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
