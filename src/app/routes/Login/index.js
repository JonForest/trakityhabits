import React from 'react';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

export default function Login() {
  console.log(firebaseui);
  let ui = new firebaseui.auth.AuthUI(firebase.auth());
  console.log(ui);
  return <h1>Login</h1>;
}
