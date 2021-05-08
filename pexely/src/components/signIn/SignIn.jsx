import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import "./Signin.css";
import { auth, db, googleProvider } from '../../firebase';
import { useHistory } from 'react-router';

export const SignIn = ( { setUser } ) => {

   const authenticate = () => {
       auth.signInWithPopup(googleProvider).then(res => {

           let loggedUser = {
               displayName: res.additionalUserInfo.profile.given_name,
               id: res.additionalUserInfo.profile.id
           }

        if (res.additionalUserInfo.isNewUser) {
          
            db.collection("users").doc(loggedUser.id).set({
     
                photos: []
          
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        }
           
           setUser(loggedUser);
        }).catch(err => {
          alert('There was an error');
       });
   }

  return (
        <div className="centered">
            <h1>Welcome to Pexely </h1>
            <h3>Log in to continue to the app</h3>
            <div onClick={() => authenticate() } className="google-btn">
            <div className="google-icon-wrapper">
                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
            </div>
            <p className="btn-text"><b>Sign in with google</b></p>
            </div>
        </div>
  );
}
