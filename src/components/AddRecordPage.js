import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecordForm from './RecordForm';
import { addRecord } from '../actions/records';

/**
 * Use classes to avoid inline functions. This avoids rerendering
 * on every render.
 * We put an export in front of the class keyword so we can test
 * the unconnected version.
 */ 
export class AddRecordPage extends Component
{
	constructor( props )
	{
		super( props );

		this.state =
		{
			members: this.props.members ? this.props.members : [],
			seasons: this.props.seasons ? this.props.seasons : []
		}
	}

	onSubmit = ( record ) =>
	{
			// using props.onSubmit this instead of "this.props.dispatch( addRecord( record ) )";
			this.props.addRecord(record); 
			this.props.history.push('/'); // return to dashboard
	}

	componentDidMount()
	{ 
		const doMembersExist = this.state.members.length > 0;
		const doSeasonsExist = this.state.seasons.length > 0;

		if ( !doMembersExist || !doSeasonsExist )
		{
			const message = () =>
			{
				if( !doMembersExist && !doSeasonsExist )
				{
					return 'There are no existing Seasons or Members. Please create both before creating any records.';
				}
				else if (!doMembersExist) 
				{
					return 'There are no existing Members. Please create a member before creating any records.';
				} 
				else if (!doSeasonsExist)
				{
					return 'There are no existing Seasons/categories. Please create one before creating any records.';
				}
			}
			alert(message());
			this.props.history.push('/'); // return to dashboard
		}
	};

	render(){
		return(
			<div>
				<h1>Add Record Page</h1>
				<RecordForm 
					members={ this.props.members }
					seasons={ this.props.seasons }
					onSubmit={ this.onSubmit }
				/>
			</div>
		);
	}
}

const mapStateToProps = ( state, props ) =>
{
	return { 
		members: state.members,
		seasons: state.seasons
	}
}

/**
 * Simular to mapStateToProps except it gives us access to 
 * dispatch. Needs to be passed into connect()
 * 
 * This is a lot easier to test dispatch than testing dispatch 
 * inside of onSubmit prop which used to be inside the RecordForm 
 * component.
 * 
 * We use the shorthand here which used the curly braces to 
 * implicitly return an object
 */
const mapDispatchToProps = (dispatch) => (
{
	addRecord: (record) => dispatch( addRecord( record ) )
});

export default connect( mapStateToProps, mapDispatchToProps )( AddRecordPage );