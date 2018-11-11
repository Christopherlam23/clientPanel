import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import { composeWithDevTools } from 'redux-devtools-extension';

//Reducers
import notifyReducer from './reducers/notifyReducer';

const firebaseConfig = {
  apiKey: 'AIzaSyCAc5f8FHdHAoxbsqnWasr1qQtJUAYbRuY',
  authDomain: 'client-panel-01.firebaseapp.com',
  databaseURL: 'https://client-panel-01.firebaseio.com',
  projectId: 'client-panel-01',
  storageBucket: 'client-panel-01.appspot.com',
  messagingSenderId: '391464457330'
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);

// Init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer
});

// Create initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  composeWithDevTools(reactReduxFirebase(firebase))
);

// const store = createStoreWithFirebase(
//   rootReducer,
//   initialState,
//   compose(
//     reactReduxFirebase(firebase),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

export default store;
