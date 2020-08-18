import React, { useState } from 'react';

const LETTERS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

const COLORS = [
  '#d54062',
  '#ffa36c',
  '#ebdc87',
  '#799351',
  '#ffd5cd',
  '#efbbcf',
  '#c3aed6',
  '#8675a9'
];

function createDance(title, numDancers) {
        const positions = new Array(numDancers).fill(null).map((_, i) => ({
          name: LETTERS[i],
          x: 3 + i * 3,
          y: 3,
          color: COLORS[i]
        }));
        const dance = {
          title: title,
          dimensions: {
            rows: 12,
            columns: 16
          },
          choreography: [
            {
              index: 0,
              description: 'Första positionen',
              positions: positions
            }
          ]
        };
}

export function CreateDanceForm() {
  const [title, setTitle] = useState('');
  const [numDancers, setNumDancers] = useState(3);
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        fetch('/dances/', {
          method: 'POST',
          body: JSON.stringify(createDance(title, numDancers))
        })
          .then(r => r.json())
          .then(data => {
            console.log(data);
          });
      }}
    >
      <div>
        <label>Titel</label>
        <input
          type='text'
          value={title}
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Antal dansare</label>
        <input
          type='number'
          value={numDancers}
          max={25}
          min={1}
          onChange={e => {
            setNumDancers(Number.parseInt(e.target.value));
          }}
        />
      </div>
      <button type='submit'>Skapa</button>
    </form>
  );
}
