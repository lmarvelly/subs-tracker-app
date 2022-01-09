import React from 'react';
import { connect } from 'react-redux';
import RecordFormPage from './RecordFormPage';
import { addPayment, addDebt } from '../actions/records';

const AddRecordPage = ( props ) => (
	<div>
		<h1>Add Record Page</h1>
		<RecordFormPage 
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

				console.log(props);
				props.history.push('/'); // return to dashboard
			}}
		/>
	</div>
);

export default connect()( AddRecordPage );