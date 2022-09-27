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
	const wording = (recordType === 'PAYMENT') ? 'Payment' : 'Debt' ;

	return (
		<div className='list-item'>
			<div className='list-item__row'>
				<div className='bold-font'>{sessionName}</div>
				<span>{wording}: 
					<span className={`${className}-font`}>
						{` £${numeral(amount / 100).format('0,0.00')}` }
					</span>
				</span>
			</div>
			<div className='list-item__row'>
				{moment(date).format("DD-MM-YYYY")}
			</div>
		</div>
	);
}

export default MemberRecordListItem;