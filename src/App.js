import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Jumbotron } from 'react-bootstrap';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import logo from './images/logo.png';

import { Navbar } from './components/navbar/Navbar.js';
import { Homepage } from './components/homepage/Homepage.js';
import { Footer } from './components/footer/Footer.js';
import { About } from './components/about/About.js';
import { Request } from './components/request/Request.js';
import { SessionStatus } from './SessionStatus.js'

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar logo={logo} />
        <Jumbotron>
          <h1 className="jumbotron-title">Love & Help</h1>
        </Jumbotron>
        <SessionStatus />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/request">
            <Request />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
