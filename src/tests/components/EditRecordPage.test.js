import React from 'react';
import { shallow } from 'enzyme';
import { EditRecordPage } from '../../components/EditRecordPage';
import { records, members, seasons } from '../fixtures/fixures';

let record, startEditRecord, startRemoveRecord, 
	sortMembersAlphabetAsc, sortSeasonsAlphabetDesc, history, 
	wrapper, wrapper2;

/**
 * We can test startEditRecord and startRemoveRecord easily because they have
 * been added to mapDispatchToProps
 */
beforeEach( () => 
{
	record = records[1];

	startEditRecord = jest.fn();
	startRemoveRecord = jest.fn();
	sortMembersAlphabetAsc = jest.fn();
	sortSeasonsAlphabetDesc = jest.fn();
	history = { push: jest.fn() };

	wrapper = shallow(
		<EditRecordPage
			history={history}
			sortMembersAlphabetAsc={sortMembersAlphabetAsc}
			sortSeasonsAlphabetDesc={sortSeasonsAlphabetDesc}
		/>
	);

	wrapper2 = shallow(
		<EditRecordPage 
			record={record}
			seasons={seasons} 
			members={members} 
			startEditRecord={startEditRecord}
			startRemoveRecord={startRemoveRecord}
			sortMembersAlphabetAsc={sortMembersAlphabetAsc}
			sortSeasonsAlphabetDesc={sortSeasonsAlphabetDesc}
			history={history} 
		/>
	);
	// jest.spyOn(confirm())
});

test('Expected sorting functions to have been called', () => 
{
	expect(sortMembersAlphabetAsc).toHaveBeenCalledTimes(2);
	expect(sortSeasonsAlphabetDesc).toHaveBeenCalledTimes(2);
});

test('should render edit page, state should change, without data then redirect to dashboard', () => 
{
	expect(wrapper).toMatchSnapshot();

	expect(wrapper.state('error')).toBe(true);
	expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle render edit page with record data', () => 
{
	expect(wrapper2).toMatchSnapshot();
});

test('should handle onSubmit', () => 
{
	wrapper2.find('RecordForm').prop('onSubmit')(record);

	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(startEditRecord).toHaveBeenLastCalledWith(record);
});

test('should handle startRemoveRecord', () => 
{
	window.confirm = jest.fn(() => true);
	wrapper2.find('button').at(0).simulate('click');

	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(startRemoveRecord).toHaveBeenCalled();
	expect(startRemoveRecord).toHaveBeenLastCalledWith(
	{
		id: record.id
	});
});

test('should handle startRemoveRecord', () => 
{
	window.confirm = jest.fn(() => true);
	wrapper2.find('button').at(0).simulate('click');

	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(startRemoveRecord).toHaveBeenCalled();
	expect(startRemoveRecord).toHaveBeenLastCalledWith(
	{
		id: record.id
	});
});

test('should not call startRemoveRecord', () => 
{
	window.confirm = jest.fn(() => false);
	wrapper2.find('button').at(0).simulate('click');

	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(startRemoveRecord).not.toHaveBeenCalled();
});