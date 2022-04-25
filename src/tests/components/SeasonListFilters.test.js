import React from 'react';
import { shallow } from 'enzyme';

import { SeasonListFilters } from '../../components/SeasonListFilters';

let defaultSeasonFilters,
	resetSeasonFilters,
	setSeasonTextFilter,
	sortAsc,
	sortDesc,
	wrapper;

beforeEach( () =>
{
	defaultSeasonFilters = { text: '', sortBy: 'alphabetAsc' }

	resetSeasonFilters = jest.fn();
	setSeasonTextFilter = jest.fn();
	sortAsc = jest.fn();
	sortDesc = jest.fn();

	wrapper = shallow(
		<SeasonListFilters
			resetSeasonFilters={resetSeasonFilters}
			setSeasonTextFilter={setSeasonTextFilter}
			sortAsc={sortAsc}
			sortDesc={sortDesc}

			seasonFilters={defaultSeasonFilters}
		/>
	);
});

test('should render filters', () =>
{
	expect(wrapper).toMatchSnapshot();
});

test('should handle change in text filter', () =>
{
	const value = 'Harri'
	wrapper.find('input').at(0).simulate('change',
	{
		target: { value }
	});

	expect(setSeasonTextFilter).toHaveBeenLastCalledWith(value);
});

test('should handle change to ascending order', () => 
{
	const value = 'ascending';
	const select = wrapper.find('select').at(0);
	select.simulate('change',
	{
		target: { value }
	});

	expect(sortAsc).toHaveBeenCalled();
});

test('should handle change to descending order', () => 
{
	const value = 'descending';
	const select = wrapper.find('select').at(0);
	select.simulate('change',
	{
		target: { value }
	});

	expect(sortDesc).toHaveBeenCalled();
});

test('button should reset filters', () =>
{
	wrapper.find('button').at(0).simulate('click');
	
	expect(resetSeasonFilters).toHaveBeenCalled();
});