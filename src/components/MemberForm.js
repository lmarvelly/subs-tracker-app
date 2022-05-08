import React, { Component } from 'react';

export default class MemberForm extends Component
{
	constructor( props )
	{
		super(props);

		if(props.member)
		{
			this.state = 
			{
				playerUuid: props.member.playerUuid ? props.member.playerUuid : "",
				firstName: props.member.firstName ? props.member.firstName : "",
				middleNames: props.member.middleNames ? props.member.middleNames : "",
				surname: props.member.surname ? props.member.surname : "",
				nickname: props.member.nickname ? props.member.nickname : "",
				error: ""
			}
		}
		else
		{
			this.state = 
			{
				firstName: "",
				middleNames: "",
				surname: "",
				nickname: "",
				error: ""
			}
		}
	}

	onFirstNameChange = ( e ) => {
		const firstName = e.target.value;
		if (firstName.length <= 15) 
		{
			this.setState( () => ({ firstName }) );
		}
	}

	onMiddleNameChange = ( e ) => {
		const middleNames = e.target.value;
		if (middleNames.length <= 20) 
		{
			this.setState( () => ({ middleNames }) );
		}
	}

	onSurnameChange = ( e ) => {
		const surname = e.target.value;
		if (surname.length <= 15) 
		{
			this.setState( () => ({ surname }) );
		}
	}

	onNickNameChange = ( e ) => {
		const nickname = e.target.value;
		if (nickname.length <= 20) 
		{
			this.setState( () => ({ nickname }) );
		}
	}

	// Clears error if everything is fine, and returns true or false
	isFormFalsy = () => {
		const isFalsy = !this.state.firstName || !this.state.surname;

		return isFalsy;
	}

	onSubmit = ( e ) => {
		e.preventDefault();
		const playerUuid = this.state.playerUuid;
		const firstName = this.state.firstName;
		const middleNames = this.state.middleNames;
		const surname = this.state.surname;
		const nickname = this.state.nickname;

		const member = () => ({ playerUuid, firstName, middleNames, surname, nickname });

		if( !firstName || !surname )
		{
			this.setState(() => ({ error: 'Please check details' }));
		}
		else
		{
			this.setState(() => ({ error: '' }));
			this.props.onSubmit( member() );
		}
	};

	// div around Submit button stops it from being directly styled by the form
	render()
	{
		const error = '__error'
		const firstNameErrorName = this.state.firstName ? '' : error;
		const surnameErrorName = this.state.surname ? '' : error;
		const isFalsy = this.isFormFalsy();

		return(
		<div>
			<form className='form' onSubmit={ this.onSubmit }>
				{ this.state.error && firstNameErrorName && <p className='form__error'>Please enter a first name</p> }
				<input
					className={`text-input${firstNameErrorName}`}
					type="text" 
					placeholder="First Name"
					value={ this.state.firstName }
					onChange={ this.onFirstNameChange }
				/>
				<input
					className='text-input'
					type="text" 
					placeholder="Middle Names (Optional)"
					value={ this.state.middleNames }
					onChange={ this.onMiddleNameChange }
				/>
				{ this.state.error && surnameErrorName && <p className='form__error'>Please enter a surname</p> }
				<input
					className={`text-input${surnameErrorName}`}
					type="text" 
					placeholder="Surname"
					value={ this.state.surname }
					onChange={ this.onSurnameChange }
				/>
				<input
					className='text-input'
					type="text" 
					placeholder="Nickname (Optional)"
					value={ this.state.nickname }
					onChange={ this.onNickNameChange }
				/>
				{( this.state.error && isFalsy ) && <p className='form__error'>{ this.state.error }</p>}
				<div>
					<button className='button'>
						{this.props.member ? 'Save Changes' : 'Add Member'}
					</button>
				</div>
			</form>
		</div>)
	}
}