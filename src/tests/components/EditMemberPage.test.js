import React from 'react';
import { shallow } from 'enzyme';
import { EditMemberPage } from '../../components/EditMemberPage';
import { records, members, seasons } from '../fixtures/fixures';

let member, startEditMember, startRemoveMember, history, wrapper, wrapper2;

beforeEach( () => 
{
	member = members[1];
	startEditMember = jest.fn();
	startRemoveMember = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(
		<EditMemberPage history={history} />
	);
	wrapper2 = shallow(
		<EditMemberPage  
			member={members[1]} 
			startEditMember={startEditMember}
			startRemoveMember={startRemoveMember}
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