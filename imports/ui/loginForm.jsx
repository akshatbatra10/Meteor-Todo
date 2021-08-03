import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

export const LoginForm = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = e => {
      e.preventDefault();

      Meteor.loginWithPassword(username, password)
    }

    return (
      <form className="login-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input 
          type="text"
          placeholder="username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input 
          type="password"
          placeholder="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </div>

      </form>
    )
}