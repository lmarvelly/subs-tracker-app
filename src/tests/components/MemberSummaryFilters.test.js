import React from 'react';
import { shallow } from 'enzyme';
import { MemberSummaryFilters } from '../../components/MemberSummaryFilters';
import { members } from '../fixtures/fixures';
import { defaultFilters, altFilters1, altFilters2, altFilters3 } from '../fixtures/filters';

let defaultWrapper,
	resetRecordFilters,
	setSeasonFilter, 
	startSetRecords,
	startSetSessions;

beforeEach( () =>
{
	resetRecordFilters = jest.fn();
	setSeasonFilter = jest.fn();
	startSetRecords = jest.fn();
	startSetSessions = jest.fn();

	defaultWrapper = shallow(
		<MemberSummaryFilters
			resetRecordFilters={resetRecordFilters}
			setSeasonFilter={setSeasonFilter}
			startSetRecords={startSetRecords}
			startSetSessions={startSetSessions}

			recordFilters={defaultFilters}
			members={[]}
			seasons={[]}
		/>
	);
});

test('should Render MemberSummaryFilters Component correctly without any data', () => 
{
	expect(defaultWrapper).toMatchSnapshot();

	expect(resetRecordFilters).toHaveBeenCalled();
	expect(setSeasonFilter).toHaveBeenCalled();
	expect(startSetRecords).toHaveBeenCalled();
	expect(startSetSessions).toHaveBeenCalled();
});