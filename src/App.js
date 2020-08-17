import React, { useContext, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Jumbotron } from 'react-bootstrap';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { UserContext } from './UserContext';

import logoGreen from './images/logo_green.png';

import { Navbar } from './components/navbar/Navbar.js';
import { Homepage } from './components/homepage/Homepage.js';
import { Footer } from './components/footer/Footer.js';
import { About } from './components/about/About.js';
import { Request } from './components/request/Request.js';
import { SessionStatus } from './SessionStatus.js'

function App() {

  const [user, setUser] = useState(null);

  return (
    <Router>
      <UserContext.Provider value={{user, setUser}}>
        <div className='App'>
          <Navbar logo={logoGreen} />
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
      </UserContext.Provider>
    </Router>
  );
}

export default App;
