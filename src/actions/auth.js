import { 
	auth,
	firebase,
	googleAuthProvider,
	sendPasswordResetEmail
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
	return () => {
		return firebase.auth().signInWithEmailAndPassword( email, password )
			.catch( error =>
			{
				console.log(error.code);
				console.log(error.message);

				switch (error.code)
				{
					case 'auth/wrong-password':
						alert('Password is invalid ');
						return 'Password is invalid ';
					case 'auth/invalid-email':
						alert('Invalid Email Address')
						return 'Invalid Email Address';
					default:
						alert('Error signing in with email: ', error.message);
						return 'Error signing in with email: ', error.message;
				}
			});
	};
};

// Login via Email
export const startCreateUserWithEmail = ( email, password ) =>
{
	return auth.createUserWithEmailAndPassword( email, password )
	.then( ( userCredential ) =>
	{
		userCredential.user.sendEmailVerification();
		auth.signOut();
		alert(`Confirmation email has been sent to ${email}`);
	})
	.catch(error =>
	{
		switch (error.code)
		{	
			case 'auth/email-already-in-use':
				const message1 = `Email address ${email} already in use.`;
				alert(message1);
				return message1;
			case 'auth/invalid-email':
				const message2 = `Email address ${email} is invalid.`;
				alert(message2);
				return message2;
			case 'auth/operation-not-allowed':
				const message3 = `Apologies, an error occured during sign up.`;
				alert(message3);
				return message3;
			case 'auth/weak-password':
				const message4 = 'Password is not strong enough. Add additional characters including special characters and numbers.';
				alert(message4);
				return message4;
			default:
				message5 = 'Whoops something went wrong. Please try again';
				alert(message5);
				return message5;
		}
	});
}

export const startResetPassword = ( email ) =>
{
	sendPasswordResetEmail( auth, email )
	.then( () =>
	{
		return 'Reset email sent. Please check your email';
	})
	.catch( error =>
	{
		console.log(error.code);
		console.log(error.message);
	})
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