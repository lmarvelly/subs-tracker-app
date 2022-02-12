import uuid from 'uuid';
import moment from 'moment';

/**
 * ADD A SUB PAYMENT
 * 
 * Takes in 4 arguments: playerUuid, description, amount and 
 * createdAt 
 * 
 * 
 * @param {string} playerUuid
 * @param {string} id: uuid()
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
export const addRecord = (
	{
		recordType = 'PAYMENT',
		playerUuid = '',
		seasonUuid = '',
		description = '',
		note = '',  
		createdAt = moment().valueOf(),

		amountOwed = "",
		amountPaid = "",
		amount = ""
	}) => (
	{
		type: 'ADD_RECORD',
		record: 
		{
			playerUuid,
			seasonUuid,
			id: uuid(),
			recordType,
			description,
			note,
			createdAt,
			amount,
			amountOwed,
			amountPaid: recordType === 'DEBT' ? 0 : ""
		}
	}
);

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

// PAY_DEBT
// ADD_OTHER

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