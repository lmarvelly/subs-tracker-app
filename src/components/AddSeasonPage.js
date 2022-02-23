import React, { Component } from 'react';
import { connect } from 'react-redux';
import SeasonForm from './SeasonForm';
import { addSeason } from '../actions/seasons';

export class AddSeasonPage extends Component
{
	constructor( props )
	{
		super( props );
	}

	render()
	{
		return(
			<div>
				<h1>Add Season Page</h1>

				<SeasonForm
					onSubmit=
					{
						( season ) =>
						{
							this.props.addSeason({ ...season });
							this.props.history.push('/seasons');
						}
					}
				/>
			</div>
		);
	}
}

// Using mapDispatchToProps to make testing easier
const mapDispatchToProps = ( dispatch ) => (
{
	addSeason: ({ ...season }) => dispatch( addSeason({ ...season }) )
});

export default connect( undefined, mapDispatchToProps )( AddSeasonPage );