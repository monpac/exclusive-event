import firebase from 'firebase';
import 'firebase/firestore';
import { firebaseReducer, reactReduxFirebase } from 'react-redux-firebase';
import { combineReducers, compose, createStore } from 'redux';
import { firestoreReducer, reduxFirestore } from 'redux-firestore';
import firebaseConfig from './components/firebaseConfig';
// Reducers
// @todo

//react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
};

// Init firebase
firebase.initializeApp(firebaseConfig);
// Init firestore
// const firestore = firebase.firestore();

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase)
  )(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer // <- needed if using firestore
  });

const initialState = {};

const store = createStoreWithFirebase(
    rootReducer, 
    initialState,
    compose(
        reactReduxFirebase(firebase),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;