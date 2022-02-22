import React from 'react';
import { shallow } from 'enzyme';
import { AddRecordPage } from '../../components/AddRecordPage';
import { records, members, seasons } from '../fixtures/fixures';

test('should render Add Record Page correctly without seasons and members', () => 
{
	const onSubmit = jest.fn();
	const history = { push: jest.fn() };
	const wrapper = shallow(
		<AddRecordPage onSubmit={onSubmit} history={history} />
	);

	expect(wrapper).toMatchSnapshot();
});

test('should render Add Record Page correctly with seasons and members', () => 
{
	const onSubmit = jest.fn();
	const history = { push: jest.fn() };
	const wrapper = shallow(
		<AddRecordPage seasons={seasons} members={members} onSubmit={onSubmit} history={history} />
	);

	expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => 
{
	const onSubmit = jest.fn();
	const history = { push: jest.fn() };
	const wrapper = shallow(
		<AddRecordPage seasons={seasons} members={members} onSubmit={onSubmit} history={history} />
	);
	wrapper.find('RecordForm').prop('onSubmit')(records[3]);

	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(onSubmit).toHaveBeenLastCalledWith(records[3]);
});