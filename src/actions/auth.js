import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => (
{
	type: 'LOGIN',
	uid
});

// Returns a Promise from firebase
export const startLogin = () =>
{
	return () => {
		return firebase.auth().signInWithPopup(googleAuthProvider);
	};
};

export const logout = () => (
{
	type: 'LOGOUT'
});

// Returns a Promise from firebase
export const startLogout = () =>
{
	return () => {
		return firebase.auth().signOut();
	};
};