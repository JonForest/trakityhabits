import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyA2dzR6KSl9iOLMJHD9RUmUcquEco8wDfQ',
  authDomain: 'trakityhabits.firebaseapp.com',
  databaseURL: 'https://trakityhabits.firebaseio.com',
  projectId: 'trakityhabits',
  storageBucket: 'trakityhabits.appspot.com',
  messagingSenderId: '305052306965',
  appId: '1:305052306965:web:9f8c4596243ea65f8cc81c'
};
// Initialize Firebase
firebase.initializeApp(config);
export default firebase.firestore();

export function getUser() {
  return firebase.auth().currentUser;
}
