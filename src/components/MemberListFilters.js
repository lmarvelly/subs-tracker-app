import React, { Component } from 'react';
import { connect } from 'react-redux'; // To connect to the store

import { setMemberTextFilter, sortAlphabetAsc, sortAlphabetDesc } from '../actions/memberFilters';

class MemberListFilters extends Component
{
	onSelectChange = (e) =>
	{
		switch (e.target.value) 
		{
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

	onTextChange = (e) =>
	{
		if( e.target.value.length <= 70 )
		{
			this.props.dispatch( setMemberTextFilter( e.target.value ) );
		}
	}

	render()
	{
		return(
			<div className='content-container'>
				<div className='input-group'>
					<div className='input-group__item'>
						<select
							className='select'
							value={ this.props.memberFilters.sortBy }
							onChange={this.onSelectChange}
						>
							<option value="alphabetAsc">Ascending Alphabetically</option>
							<option value="alphabetDesc">Descending Alphabetically</option>
						</select>
					</div>
					<div className='input-group__item'>
						<input 
							className='text-input'
							type="text"
							placeholder='Search Members'
							value={ this.props.memberFilters.text }
							onChange={this.onTextChange}
						/>
					</div>
				</div>
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