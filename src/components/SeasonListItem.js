import React from 'react';
import { connect } from 'react-redux';

import { removeSeason } from '../actions/seasons';

const SeasonListItem = ( props ) =>
{
	const deleteButton = 
		<button
			onClick=
			{
				(e) =>
				{
					console.log(props.seasonUuid );
					confirm('Are you sure you want to delete season') &&
					props.dispatch( removeSeason( props.seasonUuid ) );
				}
			}
		>
			Remove Season
		</button>
	return(
		<div>
			<span>
				Season Name: { props.seasonName }
				{ deleteButton }
			</span>
		</div>
	);
};

export default connect()( SeasonListItem );