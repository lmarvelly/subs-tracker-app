import React, { Component } from 'react'

class EditMemberForm extends Component
{
	constructor( props )
	{
		super( props );
	}

	render()
	{
		return(
			<form>
				<input type="text" value={ this.props.fullName } />
			</form>
		);
	}
}

export default EditMemberForm