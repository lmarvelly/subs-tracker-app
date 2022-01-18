import React, { Component } from 'react';
import uuid from 'uuid';

export default class MemberForm extends Component
{
	constructor( props )
	{
		super( props );

		this.state = 
		{
			fullName: "",
			nickName: ""
		}
	}

	onFullNameChange = ( e ) => {
		const fullName = e.target.value;
		this.setState( () => ({ fullName }) );
	}

	onNickNameChange = ( e ) => {
		const nickName = e.target.value;
		this.setState( () => ({ nickName }) );
	}

	onSubmit = ( e ) => {
		e.preventDefault();
		const fullName = this.state.fullName;
		const nickName = this.state.nickName

		// const memberProperties = { fullName: this.state.fullName, nickName: this.state.nickName }
		console.log({ fullName, nickName });
		const member = () => ({ fullName, nickName });

		this.props.onSubmit( member() );
	};

	render(){
		return(
		<div>
			<form onSubmit={ this.onSubmit }>
				Full Name:
				<input 
					type="text" 
					placeholder="Full Name"
					value={ this.state.fullName }
					onChange={ this.onFullNameChange }
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