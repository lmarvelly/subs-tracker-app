import React, { Component } from 'react';
import { connect } from 'react-redux';
import SeasonForm from './SeasonForm';
import { startAddSeason } from '../actions/seasons';

export class AddSeasonPage extends Component
{
	constructor( props )
	{
		super( props );
	}

	onSubmit = ( season ) =>
	{
		this.props.startAddSeason({ ...season });
		this.props.history.push('/seasons');
	}

	render()
	{
		return(
			<div>
				<h1>Add Season Page</h1>

				<SeasonForm
					onSubmit={ this.onSubmit }
				/>
			</div>
		);
	}
}

// Using mapDispatchToProps to make testing easier
const mapDispatchToProps = ( dispatch ) => (
{
	startAddSeason: ({ ...season }) => dispatch( startAddSeason({ ...season }) )
});

export default connect( undefined, mapDispatchToProps )( AddSeasonPage );