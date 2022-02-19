import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecordForm from './RecordForm';
import { addRecord } from '../actions/records';



class AddRecordPage extends Component
{
	constructor( props )
	{
		super( props );
	}

	componentDidMount()
	{ 
		const doMembersExist = this.props.members.length < 1;
		const doSeasonsExist = this.props.seasons.length < 1;

		if ( doMembersExist || doSeasonsExist )
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
					onSubmit={ ( record ) => {
						this.props.dispatch( addRecord( record ) );

						this.props.history.push('/'); // return to dashboard
					}}
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

export default connect( mapStateToProps )( AddRecordPage );