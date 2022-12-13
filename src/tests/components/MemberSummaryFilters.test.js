import React from 'react';
import { shallow } from 'enzyme';
import { MemberSummaryFilters } from '../../components/MemberSummaryFilters';
import { members, seasons } from '../fixtures/fixures';
import { defaultFilters, altFilters4 } from '../fixtures/filters';

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

test('should Render MemberSummaryFilters Component correctly with Member and Season data with Season Filter', () =>
{
	memberAndSeasonWrapper.setProps(
	{
		recordFilters: altFilters4
	});

	expect(memberAndSeasonWrapper).toMatchSnapshot();
});

test('should handle Changes to Member Filter', () =>
{
	const value = members[2].playerUuid;
	memberAndSeasonWrapper.find('select').at(0).simulate('change',
	{
		target: { value }
	});

	expect(setMemberUuidFilter).toHaveBeenLastCalledWith( value );
});

test('should handle Changes to Season Filter', () =>
{
	const value = seasons[2].playerUuid;
	memberAndSeasonWrapper.find('select').at(1).simulate('change',
	{
		target: { value }
	});

	expect(setSeasonFilter).toHaveBeenLastCalledWith( value );
});
