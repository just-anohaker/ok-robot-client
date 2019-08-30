import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { view as Loading } from './components/loading';
import { view as Home } from './pages/home';

// import okrobot from "okrobot-js";
// okrobot.config.hostname = "http://192.168.2.96:1996";
// okrobot.config.hostname = "http://192.168.2.79:5000";
// okrobot.config.hostname = "http://47.111.160.173:1996";
import server from "./server";
// server.okex_utils.setHostname("http://localhost:5000");
server.okex_utils.setHostname("http://192.168.2.78:5000");

const App = () => {
  return (
    <div>
      <Loading />
      <Switch>
        <Route path="/home/:item" component={Home} />
        <Redirect to="/home/accounts" />
      </Switch>
    </div>
  );
};

export default App;
