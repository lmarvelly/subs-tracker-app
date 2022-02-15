import React from 'react';
import { Link } from 'react-router-dom';

const SeasonListItem = ( props ) =>
{
	
	return(
		<div>
			<span>
				Season Name: <Link to={`/edit-season/${props.seasonUuid}`}>{ props.seasonName }</Link>
			</span>
		</div>
	);
};

export default SeasonListItem;