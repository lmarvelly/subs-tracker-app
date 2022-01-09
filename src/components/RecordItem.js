import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeRecord } from '../actions/records';

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
const RecordItem = ({ dispatch, id, playerUuid, amount, amountOwed, amountPaid, recordType, description, createdAt }) =>
{
	console.log(recordType);
	return (
		<div>
			<h3>Player: { playerUuid }</h3>
			{
				recordType === 'PAYMENT' && <p>Amount: { amount }</p>
			}
			{
				recordType === 'DEBT' && <div><p>Debt amount: { amountOwed }</p><p>Amount paid: { amountPaid }</p></div>
			}
			<p>Description: { description }</p>
			<p>Created At: { createdAt }</p>
			<button 
				onClick=
				{
					(e) =>
					{
						dispatch( removeRecord( { id } ) );
					}
				}
			>
				Delete
			</button>
		</div>
	);
}

export default connect()( RecordItem );