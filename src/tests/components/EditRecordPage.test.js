import React from 'react';
import { shallow } from 'enzyme';
import { EditRecordPage } from '../../components/EditRecordPage';
import { records, members, seasons } from '../fixtures/fixures';

let record, editRecord, history, wrapper, wrapper2;

beforeEach( () => 
{
	record = records[1];
	editRecord = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(
		<EditRecordPage editRecord={editRecord} history={history} />
	);
	wrapper2 = shallow(
		<EditRecordPage 
			record={record}
			seasons={seasons} 
			members={members} 
			editRecord={editRecord} 
			history={history} 
		/>
	);
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