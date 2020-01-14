import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';

import Home from './routes/Home';
import Add from './routes/Add';

function App() {
  return (
    <Router>
      <Route path="/" component={Home} exact />
      <Route path="/add" component={Add} exact />
    </Router>
  );
}

export default App;
