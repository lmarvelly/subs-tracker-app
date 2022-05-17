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
	.catch(error =>
	{
		switch (error.code)
		{	
			case 'auth/email-already-in-use':
				console.log(`Email address ${email} already in use.`);
				break;
			case 'auth/invalid-email':
				console.log(`Email address ${email} is invalid.`);
				break;
			case 'auth/operation-not-allowed':
				console.log(`Error during sign up.`);
				break;
			case 'auth/weak-password':
				console.log('Password is not strong enough. Add additional characters including special characters and numbers.');
				break;
			default:
				console.log(error.message);
				break;
		}
	});
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