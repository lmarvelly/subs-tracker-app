import React from 'react';
import { shallow } from 'enzyme';
import MemberRecordListItem from '../../components/MemberRecordListItem';
import { records, members, seasons } from '../fixtures/fixures';

let wrapperWithoutDiscount;

beforeEach( () =>
{

	
});

test('should Render Default Compressed MemberRecordListItem component without any data', () =>
{
	const wrapperDefaultCompressed = shallow(<MemberRecordListItem />);

	expect( wrapperDefaultCompressed ).toMatchSnapshot();
});

test('should Render a MemberRecordListItem with Debt Data', () =>
{
	const debtRecord = records[4];
	
	const recordDebtWrapper = shallow(
		<MemberRecordListItem
			amount={debtRecord.amount}
			date={debtRecord.createdAt}
			recordType={debtRecord.recordType}
			sessionName={debtRecord.sessionName}
		/>
	);

	expect( recordDebtWrapper ).toMatchSnapshot();
});

test('should Render a MemberRecordListItem with Payment Data', () =>
{
	const paymentRecord = records[1];

	const recordPaymentWrapper = shallow(
		<MemberRecordListItem
		amount={paymentRecord.amount}
		date={paymentRecord.createdAt}
		recordType={paymentRecord.recordType}
		sessionName={paymentRecord.sessionName}
		/>
	);

	expect( recordPaymentWrapper ).toMatchSnapshot();
});