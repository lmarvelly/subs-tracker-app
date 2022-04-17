import React from 'react';
import { shallow } from 'enzyme';
import MemberListItem from '../../components/MemberListItem';
import { members } from '../fixtures/fixures';

test('should render one compressed MemberListItem', () => 
{
	const member = members[0];
	const wrapper = shallow(
		<MemberListItem 
			key={member.playerUuid}
			playerUuid={ member.playerUuid }
			firstName={ member.firstName }
			middleNames={ member.middleNames }
			surname={ member.surname }
			nickname={ member.nickname }
		/>
	);
	
	expect(wrapper).toMatchSnapshot();
});