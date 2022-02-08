import React, { Component } from 'react';
import { connect } from 'react-redux'; // To connect to the store

import { setMemberTextFilter, sortAlphabetAsc, sortAlphabetDesc } from '../actions/memberFilters';

class MemberListFilters extends Component
{
	render()
	{
		return(
			<div>
				<h2>Member Filters</h2>
				<form>
					<select
						value={ this.props.memberFilters.sortBy }
						onChange=
						{
							(e) =>
							{
								switch (e.target.value) {
									case 'alphabetAsc':
										this.props.dispatch( sortAlphabetAsc() );
										break;
									case 'alphabetDesc':
										this.props.dispatch( sortAlphabetDesc() );
										break;
								
									default:
										break;
								}
							}
						}
					>
						<option value="alphabetAsc">Ascending Alphabetically</option>
						<option value="alphabetDesc">Descending Alphabetically</option>
					</select>
					<input 
						type="text"
						placeholder='Search Members'
						value={ this.props.memberFilters.text }
						onChange=
						{
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