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
 * @param {string} paymentType 'SUB_PAYMENT'
 * @param {string} description
 * @param {number} amount
 * @param {number} createdAt
 * 
 * 
 * @returns A type and a object
 * 
 * @type 'ADD_PAYMENT'
 * @object playerUuid, id, paymentType, description, amount, createdAt
 * 
 */
export const addPayment = (
{
	playerUuid,
	description = '',
	note = '', 
	amount = 0, 
	createdAt = moment().valueOf()
}) => (
console.log('ADD PAYMENT'),
{
	type: 'ADD_PAYMENT',
	payment: 
	{
		playerUuid,
		id: uuid(),
		paymentType: 'PAYMENT',
		description,
		note,
		amount,
		createdAt
	}
});

// ADD_DEBT
export const addDebt = (
	{
		playerUuid,
		description = '',
		note = '', 
		amountOwed,
		amountPaid = 0,
		createdAt = moment().valueOf()
	}) => (
	console.log('ADD DEBT'),
	{
		type: 'ADD_DEBT',
		debt: 
		{
			playerUuid,
			id: uuid(),
			paymentType: 'DEBT',
			description,
			note,
			amountOwed,
			amountPaid,
			createdAt
		}
	});

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