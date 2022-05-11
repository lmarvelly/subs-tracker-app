import { 
	auth,
	firebase,
	googleAuthProvider 
} from '../firebase/firebase';


export const login = (uid) => (
{
	type: 'LOGIN',
	uid
});

// Returns a Promise from firebase
export const startGoogleLogin = () =>
{
	return () => {
		return firebase.auth().signInWithPopup(googleAuthProvider);
	};
};

// Login via Email
export const startCreateUserWithEmail = ( email, password ) =>
{
	auth.createUserWithEmailAndPassword( email, password )
	.then( ( userCredential ) =>
	{
		userCredential.user.sendEmailVerification();
		auth.signOut();
		alert(`Email sent to ${email}`);
	})
	.catch('error');
}

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