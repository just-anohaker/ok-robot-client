import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { view as Loading } from './components/loading';
import { view as Home } from './pages/home';

import okrobot from "okrobot-js";
okrobot.config.hostname = "http://192.168.2.231:1996";
// okrobot.config.hostname = "http://192.168.2.96:1996";
// okrobot.config.hostname = "http://47.111.160.173:1996";

const App = () => {
  return (
    <div >
      <Loading />
      <Switch>
        <Route path="/home/:item" component={Home} />
        <Redirect to="/home/overview" />
      </Switch>
    </div>
  );
};

export default App;
