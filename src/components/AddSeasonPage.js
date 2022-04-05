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
				<div className='page-header'>
					<div className='content-container'>
						<h1 className='page-header__title'>Add Season Page</h1>
					</div>
				</div>

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