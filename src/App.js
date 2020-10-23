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

    <Home />


    

    <Router>
      <div>
        <nav>
          <ul>
            
            <li>
              <Link to="/about">Play</Link>
            </li>
            
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch> 
          <Route path="/about">
            <Breakout />
          </Route>
          
          
        </Switch>
      </div>
    </Router>
      
    </div>
  );
}

function Home() {
  return <h2>BREAKOUT GAME</h2>;
}

function About() {
  return <h2>About</h2>;
}



export default App;
