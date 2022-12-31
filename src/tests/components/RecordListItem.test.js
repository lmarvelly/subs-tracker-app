import React from 'react';
import { shallow } from 'enzyme';
import RecordListItem from '../../components/RecordListItem';
import { records, sessions, members, seasons } from '../fixtures/fixures';

let recordWrapper1, recordWrapper2, sessionWrapper1;
beforeEach( () => 
{
	const record1 = records[1];
	const { firstName, surname } = members[1];
	
	recordWrapper1 = shallow(
		<RecordListItem
			key={record1.id}
			name={`${firstName} ${surname}`}
			playerNameList={[]}
			seasonName={ seasons[0].seasonName }
			{...record1} 
		/>
	);

	const record2 = records[0];

	recordWrapper2 = shallow(
		<RecordListItem 
			key={record2.id}
			name={`${firstName} ${surname}`}
			playerNameList={[]}
			seasonName={ seasons[0].seasonName }
			{...record2} 
		/>
	);

	const session = sessions[0];

	sessionWrapper1 = shallow(
		<RecordListItem 
			key={session.id}
			playerNameList={session.playerList}
			recordType={session.recordType}
			seasonName={ seasons[0].seasonName }
			{...session} 
		/>
	);
});


test('should render one compressed RecordListItem payment', () => 
{
	expect( recordWrapper1 ).toMatchSnapshot();
});

test('should render one expanded RecordListItem payment', () => 
{
	recordWrapper1.find('.list-item').simulate('click');

	expect( recordWrapper1 ).toMatchSnapshot();
});

test('should render one compressed Debt RecordListItem', () => 
{
	expect( recordWrapper2 ).toMatchSnapshot();
});

test('should render one compressed Session RecordListItem', () =>
{
	expect( sessionWrapper1 ).toMatchSnapshot();
});

test('should render one expanded RecordListItem Debt', () => 
{
	recordWrapper2.find('.list-item').simulate('click');

	expect( recordWrapper2 ).toMatchSnapshot();
});

test('should render one expanded RecordListItem Session', () =>
{
	sessionWrapper1.find('.list-item').simulate('click');
	expect( sessionWrapper1 ).toMatchSnapshot();
});
