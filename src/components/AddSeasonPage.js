import React from 'react';
import { connect } from 'react-redux';
import SeasonForm from './SeasonForm';

const AddSeasonPage = ( props ) => (
	<div>
		<h1>Add Season Page</h1>

		<SeasonForm />
	</div>
);

export default connect()( AddSeasonPage );