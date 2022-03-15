import React from 'react';
import { shallow } from 'enzyme';
import { EditRecordPage } from '../../components/EditRecordPage';
import { records, members, seasons } from '../fixtures/fixures';

let record, editRecord, startRemoveRecord, history, wrapper, wrapper2;

/**
 * We can test editRecord and startRemoveRecord easily because they have
 * been added to mapDispatchToProps
 */
beforeEach( () => 
{
	record = records[1];
	editRecord = jest.fn();
	startRemoveRecord = jest.fn();
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
			startRemoveRecord={startRemoveRecord}
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
// TODO this test is failing
test('should handle startRemoveRecord', () => 
{
	wrapper2.find('button').at(0).simulate('click');

	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(startRemoveRecord).toHaveBeenCalled();
	expect(startRemoveRecord).toHaveBeenLastCalledWith(
	{
		id: record.id
	});
});