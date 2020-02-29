import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import { MyNavbar } from './components/Navbar'
import { InnerNav } from './components/InnerNav'

function App() {
  console.log(window.location)
  return (
    <Router>
      <MyNavbar />
      <Switch>
        <Route path="/cukier">
          <InnerNav name='Cukier'/>
        </Route>
        <Route path="/syrop">
          <InnerNav name='Syrop'/>
        </Route>
        <Route path="/ziola">
          <InnerNav name='Ziola'/>
        </Route>
        <Route path="/ciasto">ciasto</Route>
      </Switch>
    </Router>
  );
}

export default App;
