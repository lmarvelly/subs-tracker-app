import React from 'react';
import { shallow } from 'enzyme';
import EmailLoginForm from '../../components/EmailLoginForm';

let optionsWrapper, signInWrapper;

beforeEach(() =>
{
	optionsWrapper = shallow(<EmailLoginForm />);

	signInWrapper = shallow(<EmailLoginForm />);
	signInWrapper.setState({ displayType: 'EMAIL_SIGN_UP' });
});

test('should render Email Login Options correctly', () => 
{
	expect(optionsWrapper).toMatchSnapshot();
});

test('should render Email Sign Up form', () => 
{
	expect(signInWrapper).toMatchSnapshot();
});

// Should have 'Please check details' above Sign Up button
test('should show error message for invalid email', () =>
{	
	const email = signInWrapper.find('input').at(0);
	email.simulate('change', 
	{ 
		target: { value: 'example' }
	});

	const password = signInWrapper.find('input').at(1);
	password.simulate('change',
	{
		target: { value: 'password' }
	});

	signInWrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});
	expect(signInWrapper).toMatchSnapshot();
	expect(signInWrapper.state('formError')).toBe('Please check details');
});

// write test for missing email
test('should show error message for missing details', () =>
{
	const password = signInWrapper.find('input').at(1);
	password.simulate('change',
	{
		target: { value: 'password' }
	});

	signInWrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});
	expect(signInWrapper).toMatchSnapshot();
	expect(signInWrapper.state('formError')).toBe('Please check details');
});

test('should show error message for missing details', () =>
{
	const email = signInWrapper.find('input').at(0);
	email.simulate('change', 
	{ 
		target: { value: 'example' }
	});

	signInWrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});
	expect(signInWrapper).toMatchSnapshot();
	expect(signInWrapper.state('formError')).toBe('Please check details');
});