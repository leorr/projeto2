import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Login.css';

async function loginUser(credentials) {
   return axios.post(`https://projeto3-leorr.herokuapp.com/user/login`, credentials)
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = async e => {
    e.preventDefault();
    const res = await loginUser({
      username,
      password
    });
    setToken(res.data);
  }
  return(
    <div className="login-wrapper">
      <h1>Informações de login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
