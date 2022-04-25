import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
	resetSeasonFilters,
	sortAsc, 
	sortDesc, 
	setSeasonTextFilter 
} 
from '../actions/seasonFilters';

class SeasonListFilters extends Component
{
	onTextChange = (e) =>
	{
		if( e.target.value.length <= 30 )
		{
			this.props.setSeasonTextFilter( e.target.value );
		}
	}

	onSelectChange = (e) =>
	{
		switch (e.target.value) 
		{
			case 'ascending':
				this.props.sortAsc();
				break;
			case 'descending':
				this.props.sortDesc();
				break;
		
			default:
				break;
		}
	}

	handleClick = () =>
	{
		this.props.resetSeasonFilters();
	}

	render()
	{
		return(
			<div className='content-container'>
				<div className='input-group'>
					<div className='input-group__item'>
						<select
							className='select'
							value={ this.props.seasonFilters.sortBy }
							onChange={this.onSelectChange}
						>
							<option value="descending">Descending</option>
							<option value="ascending">Ascending</option>
						</select>
					</div>
					<div className='input-group__item'>
						<input 
							className='text-input'
							type="text"
							value={this.props.seasonFilters.text}
							placeholder='Search Seasons'
							onChange=
							{this.onTextChange}
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
	resetSeasonFilters: () => dispatch( resetSeasonFilters() ),
	setSeasonTextFilter: (text) => dispatch( setSeasonTextFilter( text ) ),
	sortAsc: () => dispatch( sortAsc() ),
	sortDesc: () => dispatch( sortDesc() )
});

const mapStateToProps = ( state ) =>
{
	return {
		seasonFilters: state.seasonFilters
	}
};

export default connect( mapStateToProps, mapDispatchToProps )( SeasonListFilters );