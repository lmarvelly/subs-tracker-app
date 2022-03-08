import React from 'react';
import { shallow } from 'enzyme';
import { AddMemberPage } from '../../components/AddMemberPage';

let startAddMember, member, history, wrapper;

beforeEach( () => 
{
	member = 
	{
		playerUuid: 'player4',
		firstName: 'John', 
		middleNames: 'Philip', 
		surname: 'Hobson', 
		nickname: 'Johnson'
	};
	startAddMember = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(
		<AddMemberPage startAddMember={startAddMember} history={history} />
	);
});

test('should render Add Member Page', () => 
{
	expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => 
{
	wrapper.find('MemberForm').prop('onSubmit')(member);

	expect(history.push).toHaveBeenLastCalledWith('/members');
	expect(startAddMember).toHaveBeenLastCalledWith(member);
});
