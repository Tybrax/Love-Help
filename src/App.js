import React, {  useState, lazy, Suspense } from 'react';
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
import { Chat } from './components/chat/Chat.js';
import { LogIn } from './components/homepage/LogIn.js';
import { SelfRequests } from './components/selfRequests/SelfRequests';
import { Requests } from './components/selfRequests/Requests';
import { Volunteering } from './components/selfRequests/Volunteering';

const SignUp = lazy(() => import('./components/homepage/SignUp.js'));
const renderLoader = () => <p>Loading</p>;

function App() {

  const [user, setUser] = useState(null);

  return (
    <Router>
      <UserContext.Provider value={{user, setUser}}>
        <div className='App'>
          <Navbar logo={logoGreen} />
          <Switch>
            <Suspense fallback={renderLoader()}>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/request" component={Request} />
              <Route exact path="/about" component={About} />
              <Route exact path="/file" component={File} />
              <Route exact path="/messages" component={Chat} />
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/dashboard" component={SelfRequests} />
              <Route exact path="/dashboard/requests" component={Requests} />
              <Route exact path="/dashboard/volunteering" component={Volunteering} />
            </Suspense>
          </Switch>
        </div>
        <Footer className="mt-5" />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
