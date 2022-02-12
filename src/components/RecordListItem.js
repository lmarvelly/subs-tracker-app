import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

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
const RecordListItem = ( {name, dispatch, id, playerUuid, seasonName, amount, amountOwed, amountPaid, recordType, description, createdAt }) =>
{
	return (
		<div>
			<Link to={`/edit-record/${id}`}>
				<h2>Description: { description }</h2>
			</Link>
			<h3>Player: { name }</h3>
			<p>Season: { seasonName }</p>
			{
				recordType === 'PAYMENT' && <p>Payment Amount: { amount }</p>
			}
			{
				recordType === 'DEBT' && <div><p>Debt amount: { amountOwed }</p><p>Amount paid: { amountPaid }</p></div>
			}
			<p>Created At: { moment( createdAt).format( "DD-MM-YYYY") }</p>
		</div>
	);
}

export default RecordListItem;