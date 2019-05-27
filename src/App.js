import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { view as Loading } from './components/loading';
import { view as Home } from './pages/home';

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
