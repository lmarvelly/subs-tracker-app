import React, { Component } from 'react';
import { connect } from 'react-redux';

const PaymentRecord = (props) => (
	<div>
		<h1>Payment Record</h1>
		<p>{props.paymentRecord.length}</p>
		{console.log(props)}
	</div>
);

/**
 * This is a HOC (A higher Order Component)
 * 
 * @function connect() connects to the state of the app. The
 * function inside determines what info we want this component
 * to access.
 */
const connectedPaymentRecord = connect((state) =>
{
	return{
		paymentRecord: state.paymentRecord
	}
})(PaymentRecord);

export default connectedPaymentRecord;