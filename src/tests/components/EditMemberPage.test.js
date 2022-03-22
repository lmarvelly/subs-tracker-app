import React from 'react';
import { shallow } from 'enzyme';
import { EditMemberPage } from '../../components/EditMemberPage';
import { records, members, seasons } from '../fixtures/fixures';

let member, 
	startEditMember, 
	startRemoveMember,
	startSetMembers,
	history, 
	wrapper, 
	wrapper2;

beforeEach( () => 
{
	member = members[1];
	startEditMember = jest.fn();
	startRemoveMember = jest.fn();
	startSetMembers = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(
		<EditMemberPage history={history} />
	);
	wrapper2 = shallow(
		<EditMemberPage  
			member={members[1]} 
			startEditMember={startEditMember}
			startRemoveMember={startRemoveMember}
			startSetMembers={startSetMembers}
			history={history} 
		/>
	);
});

test('should render edit Member page without data then redirect to the Members page', () => 
{
	expect(wrapper).toMatchSnapshot();
	expect(history.push).toHaveBeenLastCalledWith('/members');
});

test('should render edit Member page with data', () => 
{
	expect(wrapper2).toMatchSnapshot();
});

test('should handle onSubmit', () => 
{
	wrapper2.find('MemberForm').prop('onSubmit')(member);

	expect(history.push).toHaveBeenLastCalledWith('/members');
	expect(startEditMember).toHaveBeenLastCalledWith(member);
});

// Remove Member
test('should handle startRemoveMember', () => 
{
	window.confirm = jest.fn(() => true);
	wrapper2.find('button').at(0).simulate('click');

	expect(history.push).toHaveBeenLastCalledWith('/members');
	expect(startRemoveMember).toHaveBeenCalled();
	expect(startRemoveMember).toHaveBeenLastCalledWith(member.playerUuid);
});

test('should not call startRemoveMember', () => 
{
	window.confirm = jest.fn(() => false);
	wrapper2.find('button').at(0).simulate('click');

	expect(history.push).toHaveBeenLastCalledWith('/members');
	expect(startRemoveMember).not.toHaveBeenCalled();
});