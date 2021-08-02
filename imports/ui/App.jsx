import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';

import { TasksCollection } from '../api/taskCollection.js';
import { Task } from './task.jsx';

export const App = () => {
  
  const tasks = useTracker(() => TasksCollection.find({}).fetch());

    return(
      <div>
        <h1>Welcome to Meteor!</h1>
        <ul>
          { tasks.map((task) => <Task key={task._id} task={task} />) }
        </ul>
      </div>
    )
};
