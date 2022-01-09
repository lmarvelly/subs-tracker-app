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
const RecordItem = ({ dispatch, id, playerUuid, amount, description, createdAt }) =>
{
	return (
		<div>
			<h3>Player: { playerUuid }</h3>
			<p>Amount: { amount }</p>
			<p>Description: { description }</p>
			<p>Created At: { createdAt.format('DD MMM YYYY') }</p>
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