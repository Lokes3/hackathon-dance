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
  // This is a bad way to do this
  const params = new URLSearchParams(window.location.search)
  const selectedId = Number.parseInt(params.get("id"))
  if (selected) {
    return <App data={selected} />;
  } else if (selectedId && dances.filter(d => d.id === selectedId).length) {
    setSelected(dances.filter(d => d.id === selectedId)[0])
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
              <li key={i}>
                <div onClick={() => setSelected(dance)}>{dance.title}</div>
                <a href={ `/?id=${dance.id}` }>Länk</a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<DanceSelection />, document.getElementById('root'));
