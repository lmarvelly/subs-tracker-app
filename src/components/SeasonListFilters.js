import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sortAsc, sortDesc, setSeasonTextFilter } from '../actions/seasonFilters';

class SeasonListFilters extends Component
{
	render()
	{
		return(
			<div className='content-container'>
				<div className='input-group'>
					<div className='input-group__item'>
						<select
							className='select'
							value={ this.props.seasonFilters.sortBy }
							onChange=
							{
								(e) =>
								{
									switch (e.target.value) 
									{
										case 'ascending':
											this.props.dispatch( sortAsc() );
											break;
										case 'descending':
											this.props.dispatch( sortDesc() );
											break;
									
										default:
											break;
									}
								}
							}
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
							onChange=
							{
								( e ) =>
								{
									this.props.dispatch( setSeasonTextFilter( e.target.value ) )
								}
							}
						/>
					</div>
				</div>
			</div>
		);
	};
};

const mapStateToProps = ( state ) =>
{
	return {
		seasonFilters: state.seasonFilters
	}
}

export default connect( mapStateToProps )( SeasonListFilters );