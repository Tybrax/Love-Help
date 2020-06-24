import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Jumbotron } from 'react-bootstrap';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import logo from './images/logo.png';

import { Navbar } from './components/navbar/Navbar.js';
import { Homepage } from './components/homepage/Homepage.js';
import { Footer } from './components/footer/Footer.js';


function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar logo={logo} />
        {/*<Container className='space'>*/}
        {/*</Container>*/}
        <Jumbotron>
          <h1 className="jumbotron-title">Love & Help</h1>
        </Jumbotron>
        <Switch>
          <Route exact path="/">
            <Homepage/>
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
