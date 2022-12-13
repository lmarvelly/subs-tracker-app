import React from 'react';
import { shallow } from 'enzyme';
import { MemberSummaryFilters } from '../../components/MemberSummaryFilters';
import { members, seasons } from '../fixtures/fixures';
import { defaultFilters, altFilters1, altFilters2, altFilters3 } from '../fixtures/filters';

let defaultWrapper,
	memberWrapper,
	seasonWrapper,
	memberAndSeasonWrapper,
	resetRecordFilters,
	setMemberUuidFilter,
	setSeasonFilter, 
	startSetRecords,
	startSetSessions;

beforeEach( () =>
{
	resetRecordFilters = jest.fn();
	setMemberUuidFilter = jest.fn();
	setSeasonFilter = jest.fn();
	startSetRecords = jest.fn();
	startSetSessions = jest.fn();

	defaultWrapper = shallow(
		<MemberSummaryFilters
			resetRecordFilters={resetRecordFilters}
			setMemberUuidFilter={setMemberUuidFilter}
			setSeasonFilter={setSeasonFilter}
			startSetRecords={startSetRecords}
			startSetSessions={startSetSessions}

			recordFilters={defaultFilters}
			members={[]}
			seasons={[]}
		/>
	);

	memberWrapper = shallow(
		<MemberSummaryFilters
			resetRecordFilters={resetRecordFilters}
			setMemberUuidFilter={setMemberUuidFilter}
			setSeasonFilter={setSeasonFilter}
			startSetRecords={startSetRecords}
			startSetSessions={startSetSessions}

			recordFilters={defaultFilters}
			members={members}
			seasons={[]}
		/>
	);

	seasonWrapper = shallow(
		<MemberSummaryFilters
			resetRecordFilters={resetRecordFilters}
			setMemberUuidFilter={setMemberUuidFilter}
			setSeasonFilter={setSeasonFilter}
			startSetRecords={startSetRecords}
			startSetSessions={startSetSessions}

			recordFilters={defaultFilters}
			members={[]}
			seasons={seasons}
		/>
	);

	memberAndSeasonWrapper = shallow(
		<MemberSummaryFilters
			resetRecordFilters={resetRecordFilters}
			setMemberUuidFilter={setMemberUuidFilter}
			setSeasonFilter={setSeasonFilter}
			startSetRecords={startSetRecords}
			startSetSessions={startSetSessions}

			recordFilters={defaultFilters}
			members={members}
			seasons={seasons}
		/>
	);
});

test('should Render MemberSummaryFilters Component correctly without any data', () => 
{
	expect(defaultWrapper).toMatchSnapshot();

	expect(resetRecordFilters).toHaveBeenCalled();
	expect(setMemberUuidFilter).toHaveBeenCalled();
	expect(setSeasonFilter).toHaveBeenCalled();
	expect(startSetRecords).toHaveBeenCalled();
	expect(startSetSessions).toHaveBeenCalled();
});

test('should Render MemberSummaryFilters Component correctly with Member data', () => 
{
	expect(memberWrapper).toMatchSnapshot();

	expect(resetRecordFilters).toHaveBeenCalled();
	expect(setMemberUuidFilter).toHaveBeenCalled();
	expect(setSeasonFilter).toHaveBeenCalled();
	expect(startSetRecords).toHaveBeenCalled();
	expect(startSetSessions).toHaveBeenCalled();
});

test('should Render MemberSummaryFilters Component correctly with Season data', () => 
{
	expect(seasonWrapper).toMatchSnapshot();

	expect(resetRecordFilters).toHaveBeenCalled();
	expect(setMemberUuidFilter).toHaveBeenCalled();
	expect(setSeasonFilter).toHaveBeenCalled();
	expect(startSetRecords).toHaveBeenCalled();
	expect(startSetSessions).toHaveBeenCalled();
});

test('should Render MemberSummaryFilters Component correctly with Member and Season data', () => 
{
	expect(memberAndSeasonWrapper).toMatchSnapshot();

	expect(resetRecordFilters).toHaveBeenCalled();
	expect(setMemberUuidFilter).toHaveBeenCalled();
	expect(setSeasonFilter).toHaveBeenCalled();
	expect(startSetRecords).toHaveBeenCalled();
	expect(startSetSessions).toHaveBeenCalled();
});