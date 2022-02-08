import React from 'react';
import { shallow } from 'enzyme';
import RecordListItem from '../../components/RecordListItem';
import { records, members } from '../fixtures/fixures';

test('should render one RecordListItem', () => 
{
	const record = records[1];
	const member = members.find( (member) => record.playerUuid === member.playerUuid );
	const wrapper = shallow(
		<RecordListItem 
			key={record.id}
			name={`${member.firstName} ${member.surname}`} 
			{...record} 
		/>
	);
	expect( wrapper ).toMatchSnapshot();
});