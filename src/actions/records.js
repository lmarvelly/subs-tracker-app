import database from '../firebase/firebase';

/**
 * Normally returning functions wouldn't work with Redux but we can
 * now do this with redux-thunk
 */

/**
 * ADD A SUB PAYMENT
 * 
 * Takes in 4 arguments: playerUuid, sessionName, amount and 
 * createdAt 
 * 
 * 
 * @param {string} playerUuid
 * @param {string} id: firebase should return a unique key
 * @param {string} recordType 'DEBT' or 'PAYMENT'
 * @param {string} sessionName
 * @param {number} amount
 * @param {number} createdAt
 * 
 * 
 * @returns A type and a object
 * 
 * @type 'ADD_RECORD'
 * @object playerUuid, id, recordType, sessionName, amount, createdAt
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
 * 			sessionName = '',
 * 			note = '',  
 * 			createdAt = 0,
 * 			amount = ""
 * 		}
 * 	} 
 */
export const startAddRecord = ( recordData = {} ) =>
{
	return ( dispatch, getState ) => 
	{
		const uid = getState().auth.uid;
		const {
			recordType = 'PAYMENT',
			playerUuid = '',
			seasonUuid = 'undefined',
			sessionName = '',
			note = '',  
			createdAt = 0,
		
			amount = ''
		} = recordData; // Deconstruct record object

		const record = 
		{
			recordType, playerUuid, seasonUuid, sessionName, note,
			createdAt, amount
		}

		// Added return statement here for chaining together promises in records.test.js
		return database.ref(`subs-tracker/users/${uid}/debts_and_payments/${seasonUuid}`)
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

export const startEditRecord = ( id, seasonUuid, updates ) =>
{
	return ( dispatch, getState ) =>
	{
		const uid = getState().auth.uid;
		return database.ref(`subs-tracker/users/${uid}/debts_and_payments/${seasonUuid}/${id}`)
			.update(updates)
			.then(() => dispatch(editRecord(id, updates)));
	}
}


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

export const startRemoveRecord = ({ id, seasonUuid } = {}) =>
{
	return ( dispatch, getState ) =>
	{
		const uid = getState().auth.uid;
		return database.ref(`subs-tracker/users/${uid}/debts_and_payments/${seasonUuid}/${id}`)
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

export const startSetRecords = (seasonUuid) =>
{
	if (!seasonUuid) 
	{
		return ( dispatch, getState ) =>
		{
			const uid = getState().auth.uid;
			const seasons = [];

			database.ref(`subs-tracker/users/${uid}/seasons`)
				.once('value')
				.then((snapshot) =>
				{
					snapshot.forEach((childSnapshot) =>
					{
						seasons.push(childSnapshot.key);
					})
				});

			return database.ref(`subs-tracker/users/${uid}/debts_and_payments/${seasons[0]}`)
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
	}
	else
	{
		return ( dispatch, getState ) =>
		{
			const uid = getState().auth.uid;
			return database.ref(`subs-tracker/users/${uid}/debts_and_payments/${seasonUuid}`)
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
	}
};