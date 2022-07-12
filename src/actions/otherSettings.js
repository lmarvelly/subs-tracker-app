import database from '../firebase/firebase';

export const addSessionType = ( sessionType ) => (
{
	type: 'ADD_SESSION_TYPE',
	sessionType
});