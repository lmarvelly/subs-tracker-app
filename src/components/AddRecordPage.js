import React from 'react';
import { connect } from 'react-redux';
import RecordForm from './RecordForm';
import { addRecord } from '../actions/records';

const AddRecordPage = ( props ) => (
	<div>
		<h1>Add Record Page</h1>
		<RecordForm 
			members={ props.members }
			onSubmit={ ( record ) => {
				switch ( record.recordType ) {
					case 'RECORD':
						props.dispatch( addRecord( record ) );
						break;
				
					default:
						break;
				}

				props.history.push('/'); // return to dashboard
			}}
		/>
	</div>
);

const mapStateToProps = ( state, props ) =>
{
	return { members: state.members }
}

export default connect( mapStateToProps )( AddRecordPage );