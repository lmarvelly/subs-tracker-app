import React from 'react';
import { shallow } from 'enzyme';
import { EditRecordPage } from '../../components/EditRecordPage';
import { records, members, seasons } from '../fixtures/fixures';

let record, editRecord, removeRecord, history, wrapper, wrapper2;

/**
 * We can test editRecord and removeRecord easily because they have
 * been added to mapDispatchToProps
 */
beforeEach( () => 
{
	record = records[1];
	editRecord = jest.fn();
	removeRecord = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(
		<EditRecordPage history={history} />
	);
	wrapper2 = shallow(
		<EditRecordPage 
			record={record}
			seasons={seasons} 
			members={members} 
			editRecord={editRecord}
			removeRecord={removeRecord}
			history={history} 
		/>
	);
	// jest.spyOn(confirm())
});

test('should render edit page without data then redirect to dashboard', () => 
{
	expect(wrapper).toMatchSnapshot();
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
	expect(editRecord).toHaveBeenLastCalledWith(record);
});

// Remove Record
test('should handle removeRecord', () => 
{
	console.log('Length: ', wrapper2.find('button').length);
	wrapper2.find('button').at(0).simulate('click');

	expect(history.push).toHaveBeenLastCalledWith('/');
	// expect(removeRecord).toHaveBeenLastCalledWith(
	// {
	// 	id: record.id
	// });
});