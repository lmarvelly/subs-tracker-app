import React, { Component } from 'react';
import { connect } from 'react-redux'; // To connect to the store

import { 
	resetMemberFilters,
	setMemberTextFilter,
	sortAlphabetAsc,
	sortAlphabetDesc
} 
from '../actions/memberFilters';

class MemberListFilters extends Component
{
	constructor(props)
	{
		super(props);
	}

	onSelectChange = (e) =>
	{
		switch (e.target.value) 
		{
			case 'alphabetAsc':
				this.props.sortAlphabetAsc();
				break;
			case 'alphabetDesc':
				this.props.sortAlphabetDesc();
				break;
		
			default:
				break;
		}
	}

	onTextChange = (e) =>
	{
		if( e.target.value.length <= 70 )
		{
			this.props.setMemberTextFilter( e.target.value );
		}
	}

	handleClick = (e) =>
	{
		this.props.resetMemberFilters();
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
					<button 
						className='button'
						onClick={ this.handleClick }
					>
						Reset Filters
					</button>
				</div>
			</div>
		);
	};
};

const mapDispatchToProps = ( dispatch, props ) =>
({
	resetMemberFilters: () => dispatch( resetMemberFilters() ),
	setMemberTextFilter: ( text ) => dispatch( setMemberTextFilter( text ) ),
	sortAlphabetAsc: () => dispatch( sortAlphabetAsc() ),
	sortAlphabetDesc: () => dispatch( sortAlphabetDesc() )
})

const mapStateToProps = ( state ) =>
{
	return {
		memberFilters: state.memberFilters
	};
};

export default connect( mapStateToProps, mapDispatchToProps )( MemberListFilters );