import logo from './logo.svg';
import  MainPage  from './components/MainPage';

import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SignIn } from './components/signIn/SignIn';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = process.env.REACT_APP_PEXELS_KEY;
  })

  return (
    <div className="App">
      {user !== null ? <MainPage setUser = {setUser} currentUser = {user}/> : <SignIn setUser = {setUser} /> }
    </div>
  );
}

export default App;

