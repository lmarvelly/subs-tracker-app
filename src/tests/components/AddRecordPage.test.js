import React from 'react';
import { shallow } from 'enzyme';
import { AddRecordPage } from '../../components/AddRecordPage';
import { records, members, seasons } from '../fixtures/fixures';

let startAddRecord, history, wrapper, wrapper2;

beforeEach( () => 
{
	startAddRecord = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(
		<AddRecordPage startAddRecord={startAddRecord} history={history} />
	);
	wrapper2 = shallow(
		<AddRecordPage seasons={seasons} members={members} startAddRecord={startAddRecord} history={history} />
	);
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