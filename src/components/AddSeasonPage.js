import React from 'react';
import { connect } from 'react-redux';
import SeasonForm from './SeasonForm';
import { addSeason } from '../actions/seasons';

const AddSeasonPage = ( props ) => (
	<div>
		<h1>Add Season Page</h1>

		<SeasonForm
			onSubmit=
			{
				( season ) =>
				{
					props.dispatch( addSeason({ ...season }));
					props.history.push('/');
				}
			}
		/>
	</div>
);

export default connect()( AddSeasonPage );