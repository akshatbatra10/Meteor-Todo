import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { TasksCollection } from '../api/TaskCollection.js';
import { Task } from './task.jsx';
import { TaskForm } from './taskForm.jsx';
import { LoginForm } from './loginForm.jsx';

export const App = () => {

  const user = useTracker(() => Meteor.user());

  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = {isChecked: { $ne: true }}

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if(!Meteor.user()) return noDataAvailable;

    const handler = Meteor.subscribe('tasks');
    if(!handler.ready()) {
      return { ...noDataAvailable, isLoading: true }
    }

    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      { 
        sort: { createdAt: -1 } 
      }
      ).fetch();
    
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount }
  })

  const toggleChecked = ({ _id, isChecked }) => {
    Meteor.call('tasks.setIsChecked', _id, !isChecked);
  }

  const deleteTask = ({ _id }) => {
    Meteor.call('tasks.remove', _id);
  }

  const pendingTaskTitle = `${pendingTasksCount ? ` (${pendingTasksCount})` : ''}`

  return(
    <div className="app">
     <header>
      <div className="app-bar">
        <div className=".app-header">
          <h1>
            📝To Do List
            {pendingTaskTitle}
          </h1>
        </div>
      </div>
     </header>
     <div className="main">
      {
        user ? (
          <Fragment>

            <div className="user" onClick={() => Meteor.logout()}>
              {user.username} 🚪
            </div>

            <TaskForm user={user} />

            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? 'Show All' : 'Hide Completed'}
              </button>
            </div>

            { isLoading && <div className="loading">Loading...</div> }

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
