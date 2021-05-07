import logo from './logo.svg';
import  MainPage  from './components/MainPage';

import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 
import { SignIn } from './components/signIn/SignIn';

function App() {

  useEffect(() => {
  })

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path ="/" component={MainPage}></Route>
          <Route path="/signin" component={SignIn}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

