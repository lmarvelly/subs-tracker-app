import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @param {*} props Is deconstructed into
 * 	dispatch - this is passed down from PaymentRecord when record was spread {...record}
 * 	id
 * 	playerUuid
 * 	amount
 * 	description
 * 	createdAt
 * 
 * No need to define mapStateToProps because everything we need,
 * including dispatch, is being passed down from PaymentRecord 
 * 
 * @returns 
 */
const RecordItem = ( { dispatch, id, playerUuid, amount, amountOwed, amountPaid, recordType, description, createdAt }) =>
{
	return (
		<div>
			<Link to={`/edit-record/${id}`}>
				<h2>Description: { description }</h2>
			</Link>
			<h3>Player: { playerUuid }</h3>
			{
				recordType === 'PAYMENT' && <p>Amount: { amount }</p>
			}
			{
				recordType === 'DEBT' && <div><p>Debt amount: { amountOwed }</p><p>Amount paid: { amountPaid }</p></div>
			}
			<p>Created At: { moment( createdAt).format( "DD-MM-YYYY") }</p>
		</div>
	);
}

export default RecordItem;