import React from 'react';

const EditRecordPage = (props) => 
{
	console.log(props);
	return (
		<div>Edit Sub with ID: { props.match.params.id }</div>
	)
};

export default EditRecordPage;