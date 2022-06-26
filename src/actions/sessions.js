import database from '../firebase/firebase';

/**
 * Add a Session
 * @param {string} sessionUuid
 * @param {string} id: firebase should return a unique key
 * @param {array} sessionArray an array of records to add to records
 * @param {string} recordType 'DEBT'
 * @param {string} description 
 * @param {number} amount amount for each 
 * @param {number} createdAt
 */
export const addSession = ( session ) => (
{
	type: 'ADD_SESSION',
	session
});