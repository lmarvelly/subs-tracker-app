import React from 'react';
import moment from 'moment';
import numeral from 'numeral';

const MemberRecordListItem = (
{
	amount,
	date,
	recordType,
	sessionName
}) =>
{
	console.log(recordType);
	let wording;

	if((recordType === 'DEBT') || recordType === 'SESSION')
	{
		console.log('Debt');
		wording = 'Debt';
	}
	else if (recordType === 'PAYMENT') 
	{
		console.log('Payment');
		wording = 'Amount'
	}
	else
	{
		wording = '';
	}
	
	console.log(wording);

	return (
		<div className='list-item'>
			<div className='list-item__row'>
				<div className='bold-font'>{sessionName}</div>
				<span>{wording}: {` £${numeral(amount / 100).format('0,0.00')}` }</span>
			</div>
			<div className='list-item__row'>
				{moment(date).format("DD-MM-YYYY")}
			</div>
		</div>
	);
}

export default MemberRecordListItem;