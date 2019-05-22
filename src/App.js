import React from 'react';
import { Route } from 'react-router-dom';
import { view as Loading } from './components/loading';
import { view as Home } from './pages/home';

const App = () => {
  return (
    <div>
      <Loading />
      <Route path="/" component={Home} />
    </div>
  );
};

export default App;