import React, { Component } from 'react';
import { connect } from 'react-redux';

import selectRecords from '../selectors/records';
import RecordItem from './RecordItem';

const PaymentRecord = (props) => (
	<div>
		<h1>Payment Record</h1>
		{
			props.paymentRecord.map(( record ) =>
			{
				return (
					<RecordItem key={record.id} {...record} />
				)
			})
		}
	</div>
);

const mapStateToProps = (state) =>
{
	return{
		paymentRecord: selectRecords(state.paymentRecord, state.filters),
	}
};

/**
 * @function connect() This is a HOC (A higher Order Component)
 * connects to the state of the app. The function references
 * inside, mapStateToProps() determines what info we want this 
 * component to access.
 */
export default connect( mapStateToProps )( PaymentRecord );
