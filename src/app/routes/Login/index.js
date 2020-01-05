import React from 'react';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

export default function Login({ history }) {
  console.log(firebaseui);
  let ui = new firebaseui.auth.AuthUI(firebase.auth());
  console.log(ui);
  ui.start('#firebaseauthcontainer', {
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        history.push('/');
      }
    }
  });
  return (
    <>
      <h1>Login</h1>
      <div id="firebaseauthcontainer" />
    </>
  );
}

//todo: Extract out common layout to component
// Add this into here
