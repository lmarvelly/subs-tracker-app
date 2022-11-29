import React, { useState } from 'react';
import moment from 'moment';
import numeral from 'numeral';

const MemberRecordListItem = (
{
	amount = 0,
	date = 0,
	discount = 0,
	recordType = '',
	sessionName = ''
}) =>
{
	const [expand, setExpand] = useState(false);

	const onClickHandler = () =>
	{
		setExpand(!expand)
	}

	const className = (recordType === 'PAYMENT') ? 'green' : 'red';
	
	let type = recordType.toLowerCase();
	let firstLetter = type.charAt(0).toUpperCase();
	type = firstLetter + type.slice(1);

	return (
		<div className='list-item' onClick={onClickHandler}>
			<div className='list-item__row'>
				<h3 className='list-item__title'>{`${type}: `}<span className='normal-font-weight'>{sessionName}</span></h3>
				<span className='list-item__sub-title'>
					{moment(date).format("DD-MM-YYYY")}
				</span>
			</div>
			<div className='list-item__row'>
				<span className={`${className}-font`}>
				{
					` £${numeral(amount / 100).format('0,0.00')}` 
				}
				</span>
				{
					(discount > 0) && ` (${discount}% discount)`
				}
			</div>
		</div>
	);
}

export default MemberRecordListItem;