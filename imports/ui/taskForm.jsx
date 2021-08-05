import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

export const TaskForm = ({ user }) => {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!text) return;

        Meteor.call('tasks.insert', text);

        setText("");
    } 

    return (
        <form className="task-form" onSubmit={handleSubmit}>
          <input 
            type="text"
            placeholder="Add new Task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>
    )
}