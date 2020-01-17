import React from 'react';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import '../../../../node_modules/firebaseui/dist/firebaseui.css';
import Layout from '../../components/Layout';

export default function Login({ history }) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User already logged in
      history.push('/');
    } else {
      // On a SPA, you may have the existing authUI instance in memory (e.g. when visiting this page on logout)
      // so first try to use an existing instance
      let ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());

      // todo: On logout scenarios this may execute before the page has rendered and it generates an error. Once
      // rendering is complete, it seems to re-execute and run fine. Worth investigating
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

// todo: Get rid of the Sign in with GoogleGoogle logo thing
