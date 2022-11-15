import React from 'react';
import moment from 'moment';
import numeral from 'numeral';

const MemberRecordListItem = (
{
	amount = 0,
	date = 0,
	recordType = '',
	sessionName = ''
}) =>
{
	const className = (recordType === 'PAYMENT') ? 'green' : 'red';
	
	let type = recordType.toLowerCase();
	let firstLetter = type.charAt(0).toUpperCase();
	type = firstLetter + type.slice(1);

	return (
		<div className='list-item'>
			<div className='list-item__row'>
				<div className='bold-font'>{`${type}: `}<span className='normal-font'>{sessionName}</span></div>
				<span className={`${className}-font`}>
					{` £${numeral(amount / 100).format('0,0.00')}` }
				</span>
			</div>
			<div className='list-item__row'>
				{moment(date).format("DD-MM-YYYY")}
			</div>
		</div>
	);
}

export default MemberRecordListItem;