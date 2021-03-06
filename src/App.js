import React, {  useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { UserContext } from './UserContext';

import logoGreen from './images/logo_green.png';

import { Navbar } from './components/navbar/Navbar.js';
import { Homepage } from './components/homepage/Homepage.js';
import { File } from './components/homepage/File.js';
import { Footer } from './components/footer/Footer.js';
import { About } from './components/about/About.js';
import { Request } from './components/request/Request.js';
import { LogIn } from './components/homepage/LogIn.js';
import { Chat } from './components/chat/Chat.js';
import { SelfRequests } from './components/selfRequests/SelfRequests';

function App() {

  const [user, setUser] = useState(null);

  return (
    <Router>
      <UserContext.Provider value={{user, setUser}}>
        <div className='App'>
          <Navbar logo={logoGreen} />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/request" component={Request} />
            <Route exact path="/about" component={About} />
            <Route exact path="/file" component={File} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/dashboard" component={SelfRequests} />
            <Route exact path="/messages" component={Chat} />
          </Switch>
        </div>
        <Footer className="mt-5" />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
