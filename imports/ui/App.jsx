import React from 'react';
import { Task } from './task.jsx';

const tasks = [
  { _id: 1, text: 'Winning one million dollars' },
  { _id: 2, text: 'Spending one million dollars' },
  { _id: 3, text: 'Going broke' },
];

export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <ul>
      { tasks.map((task) => <Task key={task._id} task={task} />) }
    </ul>
  </div>
);
