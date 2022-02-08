import React, { Component } from 'react';

export default class SeasonForm extends Component
{
	constructor( props )
	{
		super( props );

		this.state = 
		{
			seasonName: ''
		}
	}

	onSeasonNameChange = ( e ) =>
	{
		const seasonName = e.target.value;
		this.setState( () => ({ seasonName }));
	}

	onSubmit = ( e ) =>
	{
		e.preventDefault();
		const seasonName = this.state.seasonName;

		if( !seasonName )
		{
			alert('Please enter a season name');
		}
		else
		{
			this.props.onSubmit({ seasonName });
		}
	}

	render()
	{
		return(
			<div>
				<form onSubmit={ this.onSubmit }>
					Season Name:
					<input 
						type='text'
						placeholder='Season Name'
						value={ this.state.seasonName }
						onChange={ this.onSeasonNameChange }
					/>
					<button>Add Season</button>
				</form>
			</div>
		);
	}
}