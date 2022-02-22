import React from 'react';
import { shallow } from 'enzyme';
import { AddRecordPage } from '../../components/AddRecordPage';
import { records, members, seasons } from '../fixtures/fixures';

let onSubmit, history, wrapper, wrapper2;

beforeEach( () => 
{
	onSubmit = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(
		<AddRecordPage onSubmit={onSubmit} history={history} />
	);
	wrapper2 = shallow(
		<AddRecordPage seasons={seasons} members={members} onSubmit={onSubmit} history={history} />
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
	expect(onSubmit).toHaveBeenLastCalledWith(records[3]);
});