import React, { Component } from 'react';

export default class SeasonForm extends Component
{
	constructor( props )
	{
		super( props );

		if ( props.season ) 
		{
			this.state = 
			{
				seasonUuid: props.season.seasonUuid ? props.season.seasonUuid : '',
				seasonName: props.season.seasonName ? props.season.seasonName : '',
				error: ''
			}	
		}
		else
		{
			this.state = 
			{
				seasonName: '',
				error: ''
			}
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
		const seasonUuid = this.state.seasonUuid;
		const seasonName = this.state.seasonName;
		const season = () => ({ seasonUuid, seasonName });

		if( !seasonName )
		{
			this.setState(() => ({ error: 'Please enter a season name' }));
		}
		else
		{
			this.setState(() => ({ error: '' }));
			this.props.onSubmit( season() );
		}
	}

	render()
	{
		// div around Submit button stops it from being directly styled by the form
		return(
			<div>
				<form className='form' onSubmit={ this.onSubmit }>
					{this.state.error && <p className='form__error'>{ this.state.error }</p>}
					<input 
						className='text-input'
						type='text'
						placeholder='Season Name'
						value={ this.state.seasonName }
						onChange={ this.onSeasonNameChange }
					/>
					<div>
						<button>{this.props.season ? 'Save Changes' : 'Add Season'}</button>
					</div>
				</form>
			</div>
		);
	}
}