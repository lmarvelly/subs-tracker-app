// New Syntax:
// Gets all the variables in 'firebase' and dumps them into the variable firebase
import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = 
{
	apiKey: "AIzaSyBPoO2oWL1x-24g0lMaIpuImJ3ydSwMgrs",
	authDomain: "subs-tracker-d6bfb.firebaseapp.com",
	databaseURL: "https://subs-tracker-d6bfb-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "subs-tracker-d6bfb",
	storageBucket: "subs-tracker-d6bfb.appspot.com",
	messagingSenderId: "598487712485",
	appId: "1:598487712485:web:4b694627691d75d60e4a0c",
	measurementId: "G-RR8L5DT0YM"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, database as default };