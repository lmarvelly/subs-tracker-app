import React from 'react';
import { shallow } from 'enzyme';
import { EditSessionPage } from '../../components/EditSessionPage';
import { sessions, members, seasons } from '../fixtures/fixures';

let history,
	sortMembersAlphabetAsc,
	sortSeasonsAlphabetDesc,
	startEditSession, 
	wrapper, 
	wrapper2;

const session = sessions[1];

beforeEach( () =>
{
	history = { push: jest.fn() };
	startEditSession = jest.fn();
	sortMembersAlphabetAsc = jest.fn();
	sortSeasonsAlphabetDesc = jest.fn();

	wrapper = shallow(
		<EditSessionPage
			history={history}
			sortMembersAlphabetAsc={sortMembersAlphabetAsc}
			sortSeasonsAlphabetDesc={sortSeasonsAlphabetDesc}
		/>
	);

	wrapper2 = shallow(
		<EditSessionPage 
			session={session}
			seasons={seasons} 
			members={members} 
			startEditSession={startEditSession}
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

test('should render edit page, state should change, without data then redirect to dashboard', () => 
{
	expect(wrapper).toMatchSnapshot();

	expect(wrapper.state('error')).toBe(true);
	expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle render edit page with session data', () => 
{
	expect(wrapper2).toMatchSnapshot();
});

test('should handle onSubmit', () => 
{
	wrapper2.find('SessionForm').prop('onSubmit')(session);

	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(startEditSession).toHaveBeenLastCalledWith(session);
});