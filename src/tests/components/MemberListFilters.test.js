import React from 'react';
import { shallow } from 'enzyme';

import { MemberListFilters } from '../../components/MemberListFilters';
import { members } from '../fixtures/fixures';

let defaultMemberFilters,
	resetMemberFilters,
	setMemberTextFilter,
	sortAlphabetAsc,
	sortAlphabetDesc,
	wrapper;

beforeEach( () =>
{
	defaultMemberFilters = { text: '', sortBy: 'alphabetAsc' }

	resetMemberFilters = jest.fn();
	setMemberTextFilter = jest.fn();
	sortAlphabetAsc = jest.fn();
	sortAlphabetDesc = jest.fn();

	wrapper = shallow(
		<MemberListFilters
			resetMemberFilters={resetMemberFilters}
			setMemberTextFilter={setMemberTextFilter}
			sortAlphabetAsc={sortAlphabetAsc}
			sortAlphabetDesc={sortAlphabetDesc}

			memberFilters={defaultMemberFilters}
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

	expect(setMemberTextFilter).toHaveBeenLastCalledWith(value);
});