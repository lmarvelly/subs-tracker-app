// New Syntax:
// Gets all the variables in 'firebase' and dumps them into the variable firebase
import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = 
{
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Force Firebase to select a Google account everytime user logs in
googleAuthProvider.setCustomParameters(
{
	'prompt': 'select_account'
});

export { auth, firebase, googleAuthProvider, database as default };