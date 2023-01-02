import React from 'react';
import { shallow } from 'enzyme';

import { MemberSummaryPage } from '../../components/MemberSummaryPage';
import { faultyRecords, faultySeasons, members, records, seasons, sessions, faultySessions } from '../fixtures/fixures';
import { getMemberTotals, getAttendenceTotals, getSeasonTotals } from '../../functions/recordTotals';

test('should render empty MemberSummaryPage component', () =>
{
	const recordTotals = { totalDebt: 0, totalPaid: 0 }

	const emptyWrapper = shallow(
		<MemberSummaryPage
			recordTotals = {recordTotals}
			records = {[]}
			seasons = {[]}
		/>
	);

	expect( emptyWrapper ).toMatchSnapshot();
});

test('should render MemberSummaryPage component with seasons and records for second member in members array', () =>
{
	const member = members[1].playerUuid;
	const allRecords = records.concat(sessions);
	const recordTotals = getMemberTotals(allRecords, member);

	const recordsWrapper = shallow(
		<MemberSummaryPage
			memberFilter={member}
			recordTotals={recordTotals}
			records={allRecords}
			seasons={seasons}
		/>
	);

	expect( recordTotals ).toEqual({totalPaid: 9400, totalDebt: 300})
	expect( recordsWrapper ).toMatchSnapshot();
});


test('should render MemberSummaryPage component with faulty records data', () => 
{
	const member = members[1].playerUuid;
	const recordTotals = getMemberTotals(faultyRecords, member);

	const recordsWrapper = shallow(
		<MemberSummaryPage
			memberFilter={member}
			recordTotals={recordTotals}
			records={faultyRecords}
			seasons={seasons}
		/>
	);

	expect( recordsWrapper ).toMatchSnapshot();
});

test('should render MemberSummaryPage component with faulty sessions data', () => 
{
	const member = members[1].playerUuid;
	const recordTotals = getMemberTotals(faultySessions, member);

	const recordsWrapper = shallow(
		<MemberSummaryPage
			memberFilter={member}
			recordTotals={recordTotals}
			records={faultySessions}
			seasons={seasons}
		/>
	);

	expect( recordsWrapper ).toMatchSnapshot();
});

test('should render MemberSummaryPage component with seasons and records for third member in members array', () =>
{
	const member = members[2].playerUuid;
	const allRecords = records.concat(sessions)
	const recordTotals = { totalPaid: 6500, totalDebt: 3000 };

	const recordsWrapper = shallow(
		<MemberSummaryPage
			memberFilter={member}
			recordTotals = {recordTotals}
			records = {allRecords}
			seasons={seasons}
		/>
	);

	expect( recordsWrapper ).toMatchSnapshot();
});

test('should render MemberSummaryPage component with faulty seasons', () =>
{
	const member = members[2].playerUuid;
	const allRecords = records.concat(sessions)
	const recordTotals = { totalPaid: 6500, totalDebt: 3000 };

	const recordsWrapper = shallow(
		<MemberSummaryPage
			memberFilter={member}
			recordTotals = {recordTotals}
			records = {allRecords}
			seasons={faultySeasons}
		/>
	);

	expect( recordsWrapper ).toMatchSnapshot();
});