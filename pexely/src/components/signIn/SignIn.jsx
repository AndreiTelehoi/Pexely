import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import "./Signin.css";
import { auth, googleProvider } from '../../firebase';
import { useHistory } from 'react-router';


export const SignIn = () => {
    const [count, setCount] = useState(0);
    const history = useHistory();
   useEffect(() => {

   });

   const authenticate = () => {
       auth.signInWithPopup(googleProvider).then(res => {
           history.push("/");
       }).catch(err => {
           console.log(err);
       })
   }

  return (

        <div className="centered">
            <div onClick={() => authenticate() } className="google-btn">
            <div className="google-icon-wrapper">
                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
            </div>
            <p className="btn-text"><b>Sign in with google</b></p>
            </div>
        </div>

  );
}
