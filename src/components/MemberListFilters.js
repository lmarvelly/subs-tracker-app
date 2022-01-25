import React, { Component } from 'react';
import { connect } from 'react-redux'; // To connect to the store

import { setMemberTextFilter } from '../actions/memberFilters';

class MemberListFilters extends Component
{
	render()
	{
		return(
			<div>
				<h2>Member Filters</h2>
				<form>
					<input 
						type="text"
						value={ this.props.memberFilters.text }
						onChange=
						{
							console.log( 'Props: ', this.props),
							(e) =>
							{
								this.props.dispatch( setMemberTextFilter( e.target.value ) )
							}
						}
					/>
				</form>
			</div>
		);
	}
} 

const mapStateToProps = ( state ) =>
{
	return {
		memberFilters: state.memberFilters
	};
};

export default connect( mapStateToProps )( MemberListFilters );