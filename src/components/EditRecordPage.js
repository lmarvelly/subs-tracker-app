import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecordForm from './RecordForm';
import { editRecord, removeRecord } from '../actions/records';

/**
 * Use classes to avoid inline functions. This avoids rerendering
 * on every render.
 * We put an export in front of the class keyword so we can test
 * the unconnected version.
 */
export class EditRecordPage extends Component
{
	constructor( props )
	{
		super( props );
		this.state =
		{
			error: this.props.record ? false : true
		}
		
		console.log('Record Error: ', this.state.error);
	}

	// Adding alert() CAUSES ERRORS
	componentDidMount()
	{
		if(this.state.error)
		{
			// alert('Whoops something went wrong');
			this.props.history.push('/'); // return to dashboard
		}
	}

	onSubmit = ( record ) => 
	{
		this.props.editRecord( record );

		this.props.history.push('/'); // return to dashboard
	}

	deleteButton = <button onClick = 
	{
		(e) =>
		{
			confirm('Are you sure you want to remove record?') &&
			this.props.removeRecord( this.props.record.id );
			this.props.history.push('/'); // return to dashboard
		}
	}
	>
		Delete
	</button>

	render()
	{
		return (
			<div>
				<RecordForm
					record={ this.props.record }
					members={ this.props.members } // TODO change to member rather than all the members
					seasons={ this.props.seasons }
					onSubmit={ this.onSubmit }
				/>
				{ this.deleteButton }
			</div>
		)
	}
}

// Give the component the current record object. We can take the props from the HOC and add to them
// This goes out of sync atm if you refresh the page because a new id gets generated for the record
const mapStateToProps = ( state, props ) =>
{ 
	return {
		members: state.members,
		record: state.paymentRecord.find( ( record ) => record.id === props.match.params.id),
		seasons: state.seasons
	}
};

const mapDispatchToProps = ( dispatch ) => (
{
	editRecord: ( record ) => dispatch( editRecord( record.id, record ) ),
	removeRecord: ( id ) => dispatch( removeRecord( { id } ) )
});

// The HOC passes the props through
export default connect( mapStateToProps, mapDispatchToProps )( EditRecordPage );