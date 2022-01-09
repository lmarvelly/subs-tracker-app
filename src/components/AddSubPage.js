import React from 'react';
import { connect } from 'react-redux';
import RecordFormPage from './RecordFormPage';
import { addPayment } from '../actions/records';

const AddSubPage = ( props ) => (
	<div>
		<h1>Add Sub Page</h1>
		<RecordFormPage 
			onSubmit={ (record) => {
				console.log( record );
				props.dispatch( addPayment( record ) );
				props.history.push('/'); // return to dashboard
			}}
		/>
	</div>
);

export default connect()( AddSubPage );