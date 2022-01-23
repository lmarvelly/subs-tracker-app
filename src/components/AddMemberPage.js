import React from 'react';
import { connect } from 'react-redux';
import MemberForm from './MemberForm';
import { addMember } from '../actions/members';

const AddMemberPage = ( props ) => (
	<div>
		<h1>Add Member Page</h1>

		<MemberForm
			onSubmit={ ( member ) => {
				props.dispatch( addMember( {...member} ) );
				props.history.push('/members'); // Return to members page
			}}
		/>
	</div>
);

export default connect()( AddMemberPage );