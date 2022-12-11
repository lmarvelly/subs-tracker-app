import React from 'react';
import { shallow } from 'enzyme';
import { AddRecordPage } from '../../components/AddRecordPage';
import { records, members, seasons } from '../fixtures/fixures';

let startAddRecord,
	setSeasonFilter,
	sortMembersAlphabetAsc, 
	sortSeasonsAlphabetDesc, 
	history, 
	wrapper, 
	wrapper2;

beforeEach( () => 
{
	setSeasonFilter = jest.fn();
	startAddRecord = jest.fn();
	sortMembersAlphabetAsc = jest.fn();
	sortSeasonsAlphabetDesc = jest.fn();
	history = { push: jest.fn() };

	wrapper = shallow(
		<AddRecordPage
			setSeasonFilter={setSeasonFilter}
			startAddRecord={startAddRecord} 
			sortMembersAlphabetAsc={sortMembersAlphabetAsc}
			sortSeasonsAlphabetDesc={sortSeasonsAlphabetDesc}
			history={history} 
		/>
	);
	wrapper2 = shallow(
		<AddRecordPage 
			seasons={seasons} 
			members={members} 
			setSeasonFilter={setSeasonFilter}
			startAddRecord={startAddRecord}
			sortMembersAlphabetAsc={sortMembersAlphabetAsc}
			sortSeasonsAlphabetDesc={sortSeasonsAlphabetDesc}
			history={history} 
		/>
	);
});

test('Expected sorting functions to have been called', () => 
{
	expect(sortMembersAlphabetAsc).toHaveBeenCalledTimes(2);
	expect(sortSeasonsAlphabetDesc).toHaveBeenCalledTimes(2);
});

test('should render Add Record Page correctly without seasons and members', () => 
{
	expect(wrapper).toMatchSnapshot();
});

test('should render Add Record Page correctly with seasons and members', () => 
{
	expect(wrapper2).toMatchSnapshot();
});

test('should handle onSubmit', () => 
{
	wrapper2.find('RecordForm').prop('onSubmit')(records[3]);

	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(startAddRecord).toHaveBeenLastCalledWith(records[3]);
});