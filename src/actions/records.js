import database from '../firebase/firebase';

/**
 * Normally returning functions wouldn't work with Redux but we can
 * now do this with redux-thunk
 */

/**
 * ADD A SUB PAYMENT
 * 
 * Takes in 4 arguments: playerUuid, description, amount and 
 * createdAt 
 * 
 * 
 * @param {string} playerUuid
 * @param {string} id: firebase should return a unique key
 * @param {string} recordType 'SUB_PAYMENT'
 * @param {string} description
 * @param {number} amount
 * @param {number} createdAt
 * 
 * 
 * @returns A type and a object
 * 
 * @type 'ADD_RECORD'
 * @object playerUuid, id, recordType, description, amount, createdAt
 * 
 */
export const addRecord = (record) => (
{
	type: 'ADD_RECORD',
	record
});

/**
 * @param {*} recordData 
 * @returns A deconstructed record
 * 
 * This could be written like so:
 * 	return (dispatch) => {
 * 		const record = {
 * 			recordType = 'PAYMENT',
 * 			playerUuid = '',
 * 			seasonUuid = '',
 * 			description = '',
 * 			note = '',  
 * 			createdAt = 0,
 * 
 * 			amountOwed = "",
 * 			amountPaid = "",
 * 			amount = ""
 * 		}
 * 	} 
 */
export const startAddRecord = ( recordData = {} ) =>
{
	return (dispatch) => 
	{
		const {
			recordType = 'PAYMENT',
			playerUuid = '',
			seasonUuid = '',
			description = '',
			note = '',  
			createdAt = 0,
		
			amountOwed = "",
			amountPaid = "",
			amount = recordType === 'PAYMENT' ? 0 : ''
		} = recordData; // Deconstruct record object

		const record = 
		{
			recordType, playerUuid, seasonUuid, description, note,
			createdAt, amountOwed, 
			amountPaid: recordType === 'DEBT' ? 0 : "", 
			amount
		}

		// Added return statement here for chaining together promises in records.test.js
		return database.ref('subs-tracker/records').push(record).then((ref) =>
			{
				dispatch(addRecord(
				{
					id: ref.key, // the key that firebase generates
					...record
				}));
			});
	};
};

/**
 * EDIT RECORD
 * 
 * @param 
 * @returns 
 */
export const editRecord = ( id, updates ) =>
({
	type: 'EDIT_RECORD',
	id,
	updates
})


/**
 * REMOVE_RECORD
 * 
 * Default is an empty object which will remove nothing
 */
export const removeRecord = ( { id } = {} ) =>
({
	type: 'REMOVE_RECORD',
	id
});