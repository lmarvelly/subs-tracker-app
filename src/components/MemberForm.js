import React, { Component } from 'react';
import uuid from 'uuid';

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
				nickName: props.member.nickName ? props.member.nickName : "",
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
				nickName: "",
				error: ""
			}
		}
	}

	onFirstNameChange = ( e ) => {
		const firstName = e.target.value;
		this.setState( () => ({ firstName }) );
	}

	onMiddleNameChange = ( e ) => {
		const middleNames = e.target.value;
		this.setState( () => ({ middleNames }) );
	}

	onSurnameChange = ( e ) => {
		const surname = e.target.value;
		this.setState( () => ({ surname }) );
	}

	onNickNameChange = ( e ) => {
		const nickName = e.target.value;
		this.setState( () => ({ nickName }) );
	}

	onSubmit = ( e ) => {
		e.preventDefault();
		const playerUuid = this.state.playerUuid;
		const firstName = this.state.firstName;
		const middleNames = this.state.middleNames;
		const surname = this.state.surname;
		const nickName = this.state.nickName;

		const member = () => ({ playerUuid, firstName, middleNames, surname, nickName });

		if( !firstName || !surname )
		{
			this.setState(() => ({ error: 'Please enter a First Name and a Surname' }));
		}
		else
		{
			this.setState(() => ({ error: '' }));
			this.props.onSubmit( member() );
		}
	};

	render(){
		return(
		<div>
			<form onSubmit={ this.onSubmit }>
				{
					this.state.error && <p>{ this.state.error }</p>
				}
				Full Name:
				<input 
					type="text" 
					placeholder="First Name"
					value={ this.state.firstName }
					onChange={ this.onFirstNameChange }
				/>
				Middle Names:
				<input 
					type="text" 
					placeholder="Middle Names (Optional)"
					value={ this.state.middleNames }
					onChange={ this.onMiddleNameChange }
				/>
				Surname:
				<input 
					type="text" 
					placeholder="Surname"
					value={ this.state.surname }
					onChange={ this.onSurnameChange }
				/>
				<br />
				Nick Name:
				<input 
					type="text" 
					placeholder="Nick Name"
					value={ this.state.nickName }
					onChange={ this.onNickNameChange }
				/><br />
				<button>Add Member</button>
			</form>
		</div>)
	}
}