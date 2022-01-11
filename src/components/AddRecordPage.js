import React from 'react';
import { connect } from 'react-redux';
import RecordForm from './RecordForm';
import { addPayment, addDebt } from '../actions/records';

const AddRecordPage = ( props ) => (
	<div>
		<h1>Add Record Page</h1>
		<RecordForm 
			onSubmit={ ( record ) => {
				switch (record.recordType) {
					case 'payment':
						props.dispatch( addPayment( record ) );
						break;
				
					case 'debt':
						props.dispatch( addDebt( record ) );
						break;
				
					default:
						break;
				}

				props.history.push('/'); // return to dashboard
			}}
		/>
	</div>
);

export default connect()( AddRecordPage );