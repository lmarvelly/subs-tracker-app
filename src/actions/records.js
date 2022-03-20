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

export const startEditRecord = ( id, updates ) =>
{
	return ( dispatch ) =>
	{
		return database.ref(`subs-tracker/main/records/${id}`)
			.update(updates)
			.then(() => dispatch(editRecord(id, updates)));
	}
}

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
		return database.ref('subs-tracker/main/records')
			.push(record)
			.then((ref) =>
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

export const startRemoveRecord = ({ id } = {}) =>
{
	return ( dispatch ) =>
	{
		return database.ref(`subs-tracker/main/records/${id}`)
			.remove()
			.then((ref) =>
			{
				dispatch(removeRecord({ id }));
			});
	};
};

/**
 *  SET_RECORDS
 */
export const setRecords = ( records ) => (
{
	type: 'SET_RECORDS',
	records
});

export const startSetRecords = () =>
{
	return (dispatch) =>
	{
		return database.ref('subs-tracker/main/records')
			.once('value')
			.then((snapshot) =>
			{
				const records = [];

				snapshot.forEach((childSnapshot) =>
				{
					records.push(
					{
						id: childSnapshot.key,
						...childSnapshot.val()
					});
				});

				dispatch(setRecords( records ));
			});
	};
};