import React from 'react';
import Breakout from "./games/breakout";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';

function App() {
  return (
    <div className="App">
    

    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch> 
          <Route path="/about">
            <Breakout />
          </Route>
          
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
      
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}



export default App;
