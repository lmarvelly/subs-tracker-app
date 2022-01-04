import React, { Component } from 'react';

/**
 * 
 * @param {*} props Is deconstructed into
 * 	playerUuid
 * 	amount
 * 	description
 * 	createdAt
 *  
 * @returns 
 */
const RecordItem = ({ id, playerUuid, amount, description, createdAt }) =>
{
	return (
		<div>
			<h3>Player: { playerUuid }</h3>
			<p>Amount: { amount }</p>
			<p>Description: { description }</p>
			<p>Created At: { createdAt }</p>
			<br />
		</div>
	);
}

export default RecordItem;