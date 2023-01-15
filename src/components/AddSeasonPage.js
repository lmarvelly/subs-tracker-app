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
		if (!confirm('New Season added! Would you like to create another?')) 
		{
			this.props.history.push('/seasons'); // Return to seasons page
		}
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
				<div className='content-container'>
					<SeasonForm
						onSubmit={ this.onSubmit }
					/>
				</div>
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