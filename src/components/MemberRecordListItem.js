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
			{
				expand
				?
					<div>
						<div className='bold-font'>{`${type}: `}<span className='normal-font'>{sessionName}</span></div>
						<span className='list-item__sub-title'>
							{moment(date).format("DD-MM-YYYY")}
						</span>
						<hr />
						<span className={`${className}-font`}>
							{` £${numeral(amount / 100).format('0,0.00')}` }
						</span>
						{
							(discount > 0) && ` (Discount: ${discount}%)`
						}
					</div>
				:
					<div>
						<div className='bold-font'>{`${type}: `}<span className='normal-font'>{sessionName}</span></div>
						<span className={`${className}-font`}>
							{` £${numeral(amount / 100).format('0,0.00')}` }
						</span>
					</div>
			}
			</div>
		</div>
	);
}

export default MemberRecordListItem;