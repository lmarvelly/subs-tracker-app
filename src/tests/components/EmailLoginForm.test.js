import React from 'react';
import { shallow } from 'enzyme';
import EmailLoginForm from '../../components/EmailLoginForm';

let 
	createUserWithEmail, 
	emailSignUpWrapper,
	optionsWrapper, 
	emailSignInWrapper;

beforeEach(() =>
{
	createUserWithEmail = jest.fn();

	emailSignUpWrapper = shallow(<EmailLoginForm />);

	optionsWrapper = shallow(<EmailLoginForm />);

	emailSignInWrapper = shallow(
		<EmailLoginForm createUserWithEmail={createUserWithEmail} />);
	emailSignInWrapper.setState({ displayType: 'EMAIL_SIGN_UP' });
});

test('should render Email Login Options correctly', () => 
{
	expect(optionsWrapper).toMatchSnapshot();
});

test('should render Email Sign Up form', () => 
{
	expect(emailSignInWrapper).toMatchSnapshot();
});

// Should have 'Please check details' above Sign Up button
test('should show error message for invalid email', () =>
{	
	const email = emailSignInWrapper.find('input').at(0);
	email.simulate('change', 
	{ 
		target: { value: 'example' }
	});

	const password = emailSignInWrapper.find('input').at(1);
	password.simulate('change',
	{
		target: { value: 'password' }
	});

	emailSignInWrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});
	expect(emailSignInWrapper).toMatchSnapshot();
	expect(emailSignInWrapper.state('formError')).toBe('Please check your email');
});

// write test for missing email
test('should show error message for missing details', () =>
{
	const password = emailSignInWrapper.find('input').at(1);
	password.simulate('change',
	{
		target: { value: 'password' }
	});

	emailSignInWrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});
	expect(emailSignInWrapper).toMatchSnapshot();
	expect(emailSignInWrapper.state('formError')).toBe('Please check details');
});

test('should show error message for missing details', () =>
{
	const email = emailSignInWrapper.find('input').at(0);
	email.simulate('change', 
	{ 
		target: { value: 'example' }
	});

	emailSignInWrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});
	expect(emailSignInWrapper).toMatchSnapshot();
	expect(emailSignInWrapper.state('formError')).toBe('Please check details');
});

// Check if this.props.createUserWithEmail gets called
test('should call createUserWithEmail() from props', () =>
{
	const email = emailSignInWrapper.find('input').at(0);
	email.simulate('change', 
	{ 
		target: { value: 'example@email.com' }
	});

	const password = emailSignInWrapper.find('input').at(1);
	password.simulate('change',
	{
		target: { value: 'password' }
	});

	emailSignInWrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});
	// expect(emailSignInWrapper).toMatchSnapshot();
	expect(createUserWithEmail).toHaveBeenCalled();
});

// Test for rendering Email Sign Up


// Tests for Submitting Email Sign Up details