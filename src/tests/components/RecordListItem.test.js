import React from 'react';
import { shallow } from 'enzyme';
import RecordListItem from '../../components/RecordListItem';
import { records, members, seasons } from '../fixtures/fixures';

let wrapper1, wrapper2;

beforeEach( () => 
{
	const record1 = records[1];
	const { firstName, surname } = members[1];
	
	wrapper1 = shallow(
		<RecordListItem
			key={record1.id}
			name={`${firstName} ${surname}`}
			playerNameList={[]}
			seasonName={ seasons[0].seasonName }
			{...record1} 
		/>
	);

	const record2 = records[0];

	wrapper2 = shallow(
		<RecordListItem 
			key={record2.id}
			name={`${firstName} ${surname}`}
			playerNameList={[]}
			seasonName={ seasons[0].seasonName }
			{...record2} 
		/>
	);


});


test('should render one compressed RecordListItem payment', () => 
{
	expect( wrapper1 ).toMatchSnapshot();
});

test('should render one expanded RecordListItem payment', () => 
{
	wrapper1.find('.list-item').simulate('click');

	expect( wrapper1 ).toMatchSnapshot();
});

test('should render one compressed RecordListItem Debt', () => 
{
	expect( wrapper2 ).toMatchSnapshot();
});

test('should render one expanded RecordListItem Debt', () => 
{
	wrapper2.find('.list-item').simulate('click');

	expect( wrapper2 ).toMatchSnapshot();
});
