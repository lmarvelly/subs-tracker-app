import React from 'react';
import { shallow } from 'enzyme';
import { RecordListFilters } from '../../components/RecordListFilters';
import { members, seasons } from '../fixtures/fixures';
import { defaultFilters, altFilters1, altFilters2, altFilters3 } from '../fixtures/filters';

let descriptionTextFilter, memberTextFilter, sortBy, startDate,
endDate, seasonFilter, wrapper;

beforeEach( () =>
{
	descriptionTextFilter = jest.fn();
	memberTextFilter = jest.fn();
	sortBy = jest.fn();
	startDate = jest.fn();
	endDate = jest.fn();
	seasonFilter = jest.fn();
	wrapper = shallow( 
		<RecordListFilters 
			descriptionTextFilter={descriptionTextFilter}
			memberTextFilter={memberTextFilter}
			sortBy={sortBy}
			startDate={startDate}
			endDate={endDate}
			seasonFilter={seasonFilter}
			recordFilters={defaultFilters}

			members={[]}
			seasons={[]}
		/> 
		);
});

test('should Render RecordListFilters correctly', () => 
{
	expect(wrapper).toMatchSnapshot();
});
