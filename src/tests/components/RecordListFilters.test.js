import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { RecordListFilters } from '../../components/RecordListFilters';
import { members, seasons } from '../fixtures/fixures';
import { defaultFilters, altFilters1, altFilters2, altFilters3 } from '../fixtures/filters';

let resetRecordFilters, 
	setSessionNameTextFilter, 
	setMemberFilterText,
	setRecordTypeFilter,
	sortByDateAscending, 
	sortByDateDescending, 
	setStartDate, 
	setEndDate, 
	setSeasonFilter,
	startSetRecords,
	startSetSessions,
	emptyWrapper, 
	wrapper;

beforeEach( () =>
{
	resetRecordFilters = jest.fn();
	setSessionNameTextFilter = jest.fn();
	setMemberFilterText = jest.fn();
	setRecordTypeFilter = jest.fn();
	sortByDateAscending = jest.fn();
	sortByDateDescending = jest.fn();
	setStartDate = jest.fn();
	setEndDate = jest.fn();
	setSeasonFilter = jest.fn();
	startSetRecords = jest.fn();
	startSetSessions = jest.fn();
	
	emptyWrapper = shallow( 
		<RecordListFilters
			resetRecordFilters={resetRecordFilters}
			setSessionNameTextFilter={setSessionNameTextFilter}
			setMemberFilterText={setMemberFilterText}
			setRecordTypeFilter={setRecordTypeFilter}
			sortByDateAscending={sortByDateAscending}
			sortByDateDescending={sortByDateDescending}
			setStartDate={setStartDate}
			setEndDate={setEndDate}
			setSeasonFilter={setSeasonFilter}
			startSetRecords={startSetRecords}
			startSetSessions={startSetSessions}

			recordFilters={defaultFilters}

			members={[]}
			seasons={[]}
		/> 
	);

	wrapper = shallow( 
		<RecordListFilters
			resetRecordFilters={resetRecordFilters}
			setStartDate={setStartDate}
			setEndDate={setEndDate}
			setMemberFilterText={setMemberFilterText}
			setRecordTypeFilter={setRecordTypeFilter}
			setSessionNameTextFilter={setSessionNameTextFilter}
			setSeasonFilter={setSeasonFilter}
			sortByDateAscending={sortByDateAscending}
			sortByDateDescending={sortByDateDescending}
			startSetRecords={startSetRecords}
			startSetSessions={startSetSessions}
		
			recordFilters={defaultFilters}

			members={members}
			seasons={seasons}
		/> 
	);
});

test('should Render RecordListFilters correctly with no data', () => 
{
	expect(emptyWrapper).toMatchSnapshot();
});

test('should Render RecordListFilters correctly with members and season data', () => 
{
	expect(wrapper).toMatchSnapshot();
});

test('should Render RecordListFilters with Alt Data 1 correctly', () => 
{
	wrapper.setProps(
	{
		recordFilters: altFilters1
	});

	expect(wrapper).toMatchSnapshot();
});

// memberFilter value is missing
test('should Render RecordListFilters with Alt Data 2 correctly', () => 
{
	wrapper.setProps(
	{
		recordFilters: altFilters2
	});

	expect(wrapper).toMatchSnapshot();
});

// memberFilter value is missing
test('should Render RecordListFilters with Alt Data 3 correctly', () => 
{
	wrapper.setProps(
	{
		recordFilters: altFilters3
	});

	expect(wrapper).toMatchSnapshot();
});

test('should handle text change on Member Filter', () =>
{
	const value = 'Luke';
	wrapper.find('input').at(0).simulate('change', 
	{
		target: { value } // This becomes the e.target.value
	});

	expect(setMemberFilterText).toHaveBeenLastCalledWith( value );
});

test('should handle text change on Session Name Filter', () =>
{
	const value = 'Training';
	wrapper.find('input').at(1).simulate('change', 
	{
		target: { value }
	});

	expect(setSessionNameTextFilter).toHaveBeenLastCalledWith( value );
});

test('should call setSeasonFilter when Season Filter select value is changed', () => 
{
	const value = 'donation';
	const select = wrapper.find('select').at(0);
	select.simulate('change',
	{
		target: { value }
	});

	expect(setSeasonFilter).toHaveBeenLastCalledWith( value );
});

test('should call sortByDateAscending when Date Filter select value is changed', () => 
{
	wrapper.setProps(
	{
		recordFilters: altFilters1 // date is now sorted by dateDescending
	});
	const value = 'dateAscending';
	const select = wrapper.find('select').at(2);
	select.simulate('change',
	{
		target: { value }
	});

	expect(sortByDateAscending).toHaveBeenCalled();
});

test('should call sortByDateDescending when select value is changed', () => 
{
	const value = 'dateDescending';
	const select = wrapper.find('select').at(2);
	select.simulate('change',
	{
		target: { value }
	});

	expect(sortByDateDescending).toHaveBeenCalled();
});

test('should handle date changes', () => 
{
	const startDate = moment(0).add( 3, 'years' );
	const endDate = moment(0).add( 6, 'years' );
	const picker = wrapper.find('DateRangePicker').at(0);
	picker.prop('onDatesChange')({startDate, endDate})

	expect(setStartDate).toHaveBeenCalledWith(startDate);
	expect(setEndDate).toHaveBeenCalledWith(endDate);
});

test('should handle date focus changes', () => 
{
	const calenderFocused = 'endDate';
	const picker = wrapper.find('DateRangePicker').at(0);
	picker.prop('onFocusChange')(calenderFocused);

	expect(wrapper.state('calenderFocused')).toBe(calenderFocused);
});

test('should handle reset button click', () =>
{
	wrapper.find('button').at(0).simulate('click');
	expect(resetRecordFilters).toHaveBeenCalled();
});