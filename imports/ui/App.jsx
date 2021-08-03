import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { TasksCollection } from '../api/TaskCollection.js';
import { Task } from './task.jsx';
import { TaskForm } from './taskForm.jsx';
import { LoginForm } from './loginForm.jsx';

export const App = () => {

  const user = useTracker(() => Meteor.user());

  const toggleChecked = ({ _id, isChecked }) => {
    TasksCollection.update(_id, {
      $set: {
        isChecked: !isChecked
      }
    });
  }

  const deleteTask = ({ _id }) => {
    TasksCollection.remove(_id);
  }
  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = {isChecked: { $ne: true }}

  const pendingTasksCount = useTracker(()=> TasksCollection.find(hideCompletedFilter).count());

  const pendingTaskTitle = `${pendingTasksCount ? `${pendingTasksCount}` : ''}`

  const tasks = useTracker(() => {
    return TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, { sort: { createdAt: -1 } }).fetch();
  });

  return(
    <div className="app">
     <header>
      <div className="app-bar">
        <div className=".app-header">
          <h1>
            📝To Do List
            ({pendingTaskTitle})
          </h1>
        </div>
      </div>
     </header>
     <div className="main">
      {
        user ? (
          <Fragment>
            <TaskForm />

            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? 'Show All' : 'Hide Completed'}
              </button>
             </div>

            <ul className="tasks">
              { tasks.map((task) => <Task key={task._id} task={task} onCheckboxClick={toggleChecked} onDeleteClick={deleteTask} />) }
            </ul>
          </Fragment>
        ) : (
          <LoginForm />
        )
      }
     </div>
    </div>
    )
};
