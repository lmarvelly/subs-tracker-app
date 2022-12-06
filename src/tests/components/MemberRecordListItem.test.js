import React from 'react';
import { shallow } from 'enzyme';
import MemberRecordListItem from '../../components/MemberRecordListItem';
import { records, sessions } from '../fixtures/fixures';


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

test('should Render a MemberRecordListItem with Session Data without discount', () =>
{
	const sessionRecord = sessions[1];

	const sessionWrapper = shallow(
		<MemberRecordListItem
			amount={sessionRecord.amount}
			date={sessionRecord.createdAt}
			recordType={sessionRecord.recordType}
			sessionName={sessionRecord.sessionName}
		/>
	);

	expect( sessionWrapper ).toMatchSnapshot();
});

test('should Render a MemberRecordListItem with Session Data with discount', () =>
{
	const sessionRecord = sessions[2];
	const discount = 25;
	const amount = sessionRecord.amount * ((100 - discount) / 100);

	const sessionWrapper = shallow(
		<MemberRecordListItem
			amount={amount}
			date={sessionRecord.createdAt}
			discount={ discount }
			recordType={sessionRecord.recordType}
			sessionName={sessionRecord.sessionName}
		/>
	);

	expect( sessionWrapper ).toMatchSnapshot();
});