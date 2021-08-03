import React, { useState } from 'react';
import { TasksCollection } from '../api/TaskCollection';

export const TaskForm = ({ user }) => {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!text) return;

        TasksCollection.insert({
            text: text.trim(),
            userId: user._id,
            createdAt: new Date()
        });

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