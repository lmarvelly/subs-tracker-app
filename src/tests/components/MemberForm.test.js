import React from 'react';
import { shallow } from 'enzyme';
import MemberForm from '../../components/MemberForm';
import { members } from '../fixtures/fixures';

let blankWrapper;
let completedWrapper;

beforeEach( () =>
{
	blankWrapper = shallow(<MemberForm />);
	completedWrapper = shallow(<MemberForm member={members[0]} />);
});

test('should render Member Form correctly', () => 
{
	expect(blankWrapper).toMatchSnapshot();
});

test('should render Member form with Member Data', () => 
{
	expect(completedWrapper).toMatchSnapshot();
});

test('should render error for not inputing any values form submission', () => 
{
	blankWrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});
	expect( blankWrapper.state('error').length ).toBeGreaterThan(0);
	expect(blankWrapper).toMatchSnapshot();
});

test('should only render first name error message', () => 
{
	const surname = 'Davies'
	blankWrapper.find('#surname').simulate('change', 
	{ 
		target: { value: surname }
	});

	blankWrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});
	expect( blankWrapper.state('error').length ).toBeGreaterThan(0);
	expect(blankWrapper).toMatchSnapshot();
});

test('should only render surname error message', () => 
{
	const name = 'David'
	blankWrapper.find('#firstName').simulate('change', 
	{ 
		target: { value: name }
	});

	blankWrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});
	expect( blankWrapper.state('error').length ).toBeGreaterThan(0);
	expect(blankWrapper).toMatchSnapshot();
});