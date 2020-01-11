import React from 'react';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import Layout from '../../components/Layout';

export default function Login({ history }) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User already logged in
      history.push('/');
    } else {
      let ui = new firebaseui.auth.AuthUI(firebase.auth());

      ui.start('#firebaseauthcontainer', {
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        siteName: 'Trakity Habits',
        signInFlow: 'popup',
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            history.push('/');
          },
          uiShown() {
            document.getElementById('loader').style.display = 'none';
          }
        }
      });
    }
  });
  return (
    <Layout title="Login">
      <div id="firebaseauthcontainer" />
      <div id="loader">Loading...</div>
    </Layout>
  );
}

//todo: Extract out common layout to component
// Add this into here
