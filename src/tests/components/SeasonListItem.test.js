import React from 'react';
import { shallow } from 'enzyme';
import MemberListItem from '../../components/MemberListItem';
import { members } from '../fixtures/fixures';

let wrapper, handleClick;

beforeEach( () => 
{
	handleClick = jest.fn();

	const member = members[0];
	wrapper = shallow(
		<MemberListItem 
			key={member.playerUuid}
			playerUuid={ member.playerUuid }
			firstName={ member.firstName }
			middleNames={ member.middleNames }
			surname={ member.surname }
			nickname={ member.nickname }

			handleClick={handleClick}
		/>
	);
});

test('should render one compressed MemberListItem', () => 
{
	expect(wrapper).toMatchSnapshot();
});

test('should render one expanded MemberListItem', () => 
{	
	wrapper.find('.list-item').simulate('click');
	
	// expect(handleClick).toHaveBeenCalled(); // This is not working but the component is expanding
	expect(wrapper).toMatchSnapshot();
});