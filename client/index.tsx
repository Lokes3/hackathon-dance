import './scss/global.scss';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import data from '../test_data.json';
import { CreateDanceForm } from './CreateDanceForm';

function DanceSelection() {
  const [dances, setDances] = useState<any>([data]);
  const [selected, setSelected] = useState<any>(null);
  useEffect(() => {
    fetch('/dances/')
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        setDances([...dances, ...data.dances]);
      });
  }, []);
  if (selected) {
    return <App data={selected} />;
  } else {
    return (
      <div>
        <h1>Dappen</h1>
        <h2>Skapa ny</h2>
        <CreateDanceForm />
        <h2>Välj</h2>
        <ul>
          {dances.map((dance, i) => {
            return (
              <li key={i} onClick={() => setSelected(dance)}>
                {dance.title}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<DanceSelection />, document.getElementById('root'));
