import React from 'react';
import { shallow } from 'enzyme';
import { AddSessionPage } from '../../components/AddSessionPage';
import { members, seasons, sessions } from '../fixtures/fixures';

let history, emptyWrapper, startAddSession, wrapper;

beforeEach( () =>
{
	history = { push: jest.fn() };
	startAddSession = jest.fn();

	emptyWrapper = shallow(
		<AddSessionPage
			history={history}
		/>);

	wrapper = shallow(
		<AddSessionPage
			members={members} 
			seasons={seasons} 
			history={history}

			startAddSession={startAddSession}
		/>
	);
});

test('should render AddSessionPage correctly without members and seasons', () =>
{
	expect(emptyWrapper).toMatchSnapshot();
});

test('should render AddSessionPage correctly with members and seasons', () =>
{
	expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => 
{
	wrapper.find('SessionForm').prop('onSubmit')(sessions[0]);

	expect(history.push).toHaveBeenCalledWith('/');
	expect(startAddSession).toHaveBeenLastCalledWith(sessions[0]);
})