import React from 'react';
import { shallow } from 'enzyme';

import { MemberSummaryPage } from '../../components/MemberSummaryPage';
import { members, records, seasons, sessions } from '../fixtures/fixures';
import { getMemberTotals, getAttendenceTotals, getSeasonTotals } from '../../functions/recordTotals';

test('should render empty MemberSummaryPage component', () =>
{
	const recordTotals = { totalDebt: 0, totalPaid: 0 }

	const emptyWrapper = shallow(
		<MemberSummaryPage
			recordTotals = {recordTotals}
			records = {[]}
		/>
	);

	expect( emptyWrapper ).toMatchSnapshot();
});

test('should render MemberSummaryPage component with seasons and records for second member in members array', () =>
{
	const member = members[1].playerUuid
	const allRecords = records.concat(sessions)
	const recordTotals = getMemberTotals(allRecords, member);

	const recordsWrapper = shallow(
		<MemberSummaryPage
			memberFilter={member}
			recordTotals = {recordTotals}
			records = {allRecords}
		/>
	);

	expect( recordTotals ).toEqual({totalPaid: 9400, totalDebt: 300})
	expect( recordsWrapper ).toMatchSnapshot();
});

test('should render MemberSummaryPage component with seasons and records for third member in members array', () =>
{
	const member = members[2].playerUuid
	const allRecords = records.concat(sessions)
	const recordTotals = getMemberTotals(allRecords, member);

	const recordsWrapper = shallow(
		<MemberSummaryPage
			memberFilter={member}
			recordTotals = {recordTotals}
			records = {allRecords}
		/>
	);

	expect( recordTotals ).toEqual({totalPaid: 9400, totalDebt: 0})
	expect( recordsWrapper ).toMatchSnapshot();
});

