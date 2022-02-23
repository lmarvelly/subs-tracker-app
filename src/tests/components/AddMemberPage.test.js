import React from 'react';
import { shallow } from 'enzyme';
import { AddMemberPage } from '../../components/AddMemberPage';

let addMember, member, history, wrapper;

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
	addMember = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(
		<AddMemberPage addMember={addMember} history={history} />
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
	expect(addMember).toHaveBeenLastCalledWith(member);
});
