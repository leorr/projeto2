import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Upload from './components/Upload/Upload';
import Login from './components/Login/Login';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Switch>
          <Route exact path="/projeto2/upload" component={Upload} />
          <Route path={["/projeto2/dashboard", "/projeto2"]} component={Dashboard}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
