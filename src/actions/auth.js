import { firebase, googleAuthProvider } from '../firebase/firebase';

// Return a Promise from firebase
export const startLogin = () =>
{
	return () => {
		return firebase.auth().signInWithPopup(googleAuthProvider);
	};
};

// Return a Promise from firebase
export const startLogout = () =>
{
	return () => {
		return firebase.auth().signOut();
	};
};