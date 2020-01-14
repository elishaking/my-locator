import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'boxicons';
import './App.scss';

import Home from './components/routes/Home';
import Add from './components/routes/Add';

function App() {
  return (
    <Router>
      <div className="container">
        <header>
          <h1><box-icon name='map-pin' animation='tada' size="2em" ></box-icon> <span>My Locator</span></h1>
        </header>

        <Route path="/" component={Home} exact />
        <Route path="/add" component={Add} exact />
      </div>
    </Router>
  );
}

export default App;
