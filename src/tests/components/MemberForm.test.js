import React from 'react';
import { shallow } from 'enzyme';
import MemberForm from '../../components/MemberForm';
import { members } from '../fixtures/fixures';

let blankWrapper, completedWrapper, onFirstNameChange, 
	onSurnameChange, onSubmit;

beforeEach( () =>
{
	onFirstNameChange = jest.fn();
	onSurnameChange = jest.fn();
	onSubmit = jest.fn();

	blankWrapper = shallow(<MemberForm onFirstNameChange={onFirstNameChange} onSurnameChange={onSurnameChange} />);
	completedWrapper = shallow(<MemberForm member={members[0]} onSubmit={onSubmit} />);
});

test('should render Member Form correctly', () => 
{
	expect(blankWrapper).toMatchSnapshot();
});

test('should render Member form with Member Data', () => 
{
	expect(completedWrapper).toMatchSnapshot();
});

test('Should submit completed form without any errors and reset the form', () => 
{
	completedWrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});

	expect(completedWrapper.state('firstName')).toEqual('');
	expect(completedWrapper.state('middleNames')).toEqual('');
	expect(completedWrapper.state('surname')).toEqual('');
	expect(completedWrapper.state('nickname')).toEqual('');
	expect(completedWrapper.state('error')).toEqual('');
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

test('should change first name', () => 
{
	const name = 'Joey';
	const input = blankWrapper.find('#firstName');
	input.simulate('change', 
	{
		target: { value: name }
	});

	expect( blankWrapper.state('firstName') ).toEqual(name);
	expect( blankWrapper ).toMatchSnapshot();
});

test('should not change first name if name is too long', () => 
{
	const name = 'JoeyJoeJoeShabab';
	const input = blankWrapper.find('#firstName');
	input.simulate('change', 
	{ 
		target: { value: name }
	});

	expect( blankWrapper ).toMatchSnapshot();
	expect( blankWrapper.state('firstName') ).toEqual('');
});


test('should change surname', () => 
{
	const surname = 'Davies';
	const input = blankWrapper.find('#surname');
	input.simulate('change', 
	{
		target: { value: surname }
	});

	expect( blankWrapper ).toMatchSnapshot();

	expect( blankWrapper.state('surname') ).toEqual(surname);
});

// State not updating on render
test('should not change surname if name is too long', () => 
{
	const surname = 'JoeyJoeJoeShabab';
	const input = blankWrapper.find('#surname');
	input.simulate('change', 
	{ 
		target: { value: surname }
	});

	expect( blankWrapper ).toMatchSnapshot();
	expect( blankWrapper.state('surname') ).toEqual('');
});