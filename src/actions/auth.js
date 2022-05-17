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

export const startEmailLogin = ( email, password ) =>
{
	console.log('startEmailLogin()');
	console.log(email, password);
	return () => {
		return firebase.auth().signInWithEmailAndPassword( email, password )
			.catch( error =>
			{
				alert('Error signing in with email: ', error);
				console.log(error.code);
				console.log(error.message);
			});
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
		console.log('Signing out');
		alert(`Confirmation email has been sent to ${email}`);
	})
	.catch(error =>
	{
		switch (error.code)
		{	
			case 'auth/email-already-in-use':
				alert(`Email address ${email} already in use.`);
				break;
			case 'auth/invalid-email':
				alert(`Email address ${email} is invalid.`);
				break;
			case 'auth/operation-not-allowed':
				alert(`Apologies, an error occured during sign up.`);
				break;
			case 'auth/weak-password':
				alert('Password is not strong enough. Add additional characters including special characters and numbers.');
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