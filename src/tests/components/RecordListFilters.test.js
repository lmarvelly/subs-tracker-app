import React from 'react';
import { shallow } from 'enzyme';
import { RecordListFilters } from '../../components/RecordListFilters';
import { members, seasons } from '../fixtures/fixures';
import { defaultFilters, altFilters1, altFilters2, altFilters3 } from '../fixtures/filters';

let setDescriptionTextFilter, setMemberFilterText, 
sortByDateAscending, sortByDateDescending, setStartDate, setEndDate,
setSeasonFilter, emptyWrapper, wrapper;

beforeEach( () =>
{
	setDescriptionTextFilter = jest.fn();
	setMemberFilterText = jest.fn();
	sortByDateAscending = jest.fn();
	sortByDateDescending = jest.fn();
	setStartDate = jest.fn();
	setEndDate = jest.fn();
	setSeasonFilter = jest.fn();
	
	emptyWrapper = shallow( 
		<RecordListFilters 
			setDescriptionTextFilter={setDescriptionTextFilter}
			setMemberFilterText={setMemberFilterText}
			sortByDateAscending={sortByDateAscending}
			sortByDateDescending={sortByDateDescending}
			setStartDate={setStartDate}
			setEndDate={setEndDate}
			setSeasonFilter={setSeasonFilter}

			recordFilters={defaultFilters}

			members={[]}
			seasons={[]}
		/> 
	);

	wrapper = shallow( 
		<RecordListFilters 
			setDescriptionTextFilter={setDescriptionTextFilter}
			setMemberFilterText={setMemberFilterText}
			sortByDateAscending={sortByDateAscending}
			sortByDateDescending={sortByDateDescending}
			setStartDate={setStartDate}
			setEndDate={setEndDate}
			setSeasonFilter={setSeasonFilter}

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

test('should Render RecordListFilters with Alt Data 2 correctly', () => 
{
	wrapper.setProps(
	{
		recordFilters: altFilters2
	});

	expect(wrapper).toMatchSnapshot();
});

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
		target: { value }
	});

	expect(setMemberFilterText).toHaveBeenLastCalledWith( value );
});

test('should handle text change on Description Filter', () =>
{
	const value = 'Training';
	wrapper.find('input').at(1).simulate('change', 
	{
		target: { value }
	});

	expect(setDescriptionTextFilter).toHaveBeenLastCalledWith( value );
});

test('should call when Season Filter select value is changed', () => 
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
	const value = 'dateAscending';
	const select = wrapper.find('select').at(1);
	console.log(select.simulate('change',
	{
		target: { value }
	}));

	expect(sortByDateAscending).toHaveBeenCalled();
});

test('should call sortByDateDescending when select value is changed', () => 
{
	const value = 'dateDescending';
	const select = wrapper.find('select').at(1);
	select.simulate('change',
	{
		target: { value }
	});

	expect(sortByDateDescending).toHaveBeenCalled();
});