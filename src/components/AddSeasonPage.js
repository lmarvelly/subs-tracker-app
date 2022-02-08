import React from 'react';
import { connect } from 'react-redux';

const AddSeasonPage = ( props ) => (
	<div>
		<h1>Add Season Page</h1>

		<form action=""><input type="text" /></form>
	</div>
);

export default connect()( AddSeasonPage );