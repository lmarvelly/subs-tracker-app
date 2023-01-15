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
		if (seasonName.length <= 30) 
		{
			this.setState( () => ({ seasonName }) );
		}
	}

	isFormFalsy = () =>
	{
		const isFalsy = !this.state.seasonName;
		return isFalsy;
	}

	resetForm = () =>
	{
		this.setState(
		{
			seasonUuid: '',
			seasonName: '',
			error: ''
		});
	}

	onSubmit = ( e ) =>
	{
		e.preventDefault();
		const seasonUuid = this.state.seasonUuid;
		const seasonName = this.state.seasonName;
		const season = () => ({ seasonUuid, seasonName });

		if( !seasonName )
		{
			this.setState(() => ({ error: 'Please check details' }));
		}
		else
		{
			this.props.onSubmit( season() );
			this.resetForm();
		}
	}

	render()
	{
		const error = '__error';
		const isFalsy = this.isFormFalsy();
		const seasonNameErrorName = this.state.seasonName ? '' : error;
		// div around Submit button stops it from being directly styled by the form
		return(
			<div>
				<form className='form' onSubmit={ this.onSubmit }>
				{ this.state.error && seasonNameErrorName && <p className='form__error'>Please the season name</p> }
					<input 
						className={`text-input${seasonNameErrorName}`}
						type='text'
						placeholder='Season Name'
						value={ this.state.seasonName }
						onChange={ this.onSeasonNameChange }
					/>
					{ (this.state.error && isFalsy) && <p className='form__error'>{ this.state.error }</p>}
					<div>
						<button className='button'>
							{this.props.season ? 'Save Changes' : 'Add Season'}
						</button>
					</div>
				</form>
			</div>
		);
	}
}