import React from 'react';

const SeasonListItem = ( props ) =>
{
	return(
		<div>
			<span>
				Season Name: { props.seasonName }
			</span>
		</div>
	);
};

export default SeasonListItem;