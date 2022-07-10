import React from 'react';
import { shallow } from 'enzyme';
import { AddSessionPage } from '../../components/AddSessionPage';
import { members, seasons } from '../fixtures/fixures';

let history, emptyWrapper, wrapper;

beforeEach( () =>
{
	history = { push: jest.fn() };

	emptyWrapper = shallow(
		<AddSessionPage
			history={history}
		/>);

	wrapper = shallow(
		<AddSessionPage 
			members={members} 
			seasons={seasons} 
			history={history}
		/>
	);
});

test('should render AddSessionPage correctly without members or seasons', () =>
{
	expect(emptyWrapper).toMatchSnapshot();
});

test('should render AddSessionPage correctly with members or seasons', () =>
{
	expect(wrapper).toMatchSnapshot();
});

// TODO: REMOVE AFTER TESTING
test('should handle onSubmit', () => 
{
	// wrapper2.find('RecordForm').prop('onSubmit')(records[3]);

	// expect(history.push).toHaveBeenLastCalledWith('/');
	// expect(startAddRecord).toHaveBeenLastCalledWith(records[3]);
});

test('should handle onSubmit', () => 
{
	// TODO: Write submit test/s
	expect(true).toBe(false);
})