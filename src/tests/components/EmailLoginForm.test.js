import React from 'react';
import { shallow } from 'enzyme';
import EmailLoginForm from '../../components/EmailLoginForm';

let 
	createUserWithEmail, 
	optionsWrapper, 
	emailSignInWrapper,
	emailSignUpWrapper;

beforeEach(() =>
{
	createUserWithEmail = jest.fn();

	emailSignInWrapper = shallow(<EmailLoginForm />);
	emailSignInWrapper.setState({ displayType: 'EMAIL_LOGIN' });

	optionsWrapper = shallow(<EmailLoginForm />);

	emailSignUpWrapper = shallow(
		<EmailLoginForm createUserWithEmail={createUserWithEmail} />);
	emailSignUpWrapper.setState({ displayType: 'EMAIL_SIGN_UP' });
});

test('should render Email Login Options correctly', () => 
{
	expect(optionsWrapper).toMatchSnapshot();
});

test('should render Email Sign Up form', () => 
{
	expect(emailSignUpWrapper).toMatchSnapshot();
});

// Should have 'Please check details' above Sign Up button
test('should show error message for invalid email', () =>
{	
	const email = emailSignUpWrapper.find('input').at(0);
	email.simulate('change', 
	{ 
		target: { value: 'example' }
	});

	const password = emailSignUpWrapper.find('input').at(1);
	password.simulate('change',
	{
		target: { value: 'password' }
	});

	emailSignUpWrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});
	expect(emailSignUpWrapper).toMatchSnapshot();
	expect(emailSignUpWrapper.state('formError')).toBe('Please check your email');
});

// write test for missing email
test('should show error message for missing details', () =>
{
	const password = emailSignUpWrapper.find('input').at(1);
	password.simulate('change',
	{
		target: { value: 'password' }
	});

	emailSignUpWrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});
	expect(emailSignUpWrapper).toMatchSnapshot();
	expect(emailSignUpWrapper.state('formError')).toBe('Please check details');
});

test('should show error message for missing details', () =>
{
	const email = emailSignUpWrapper.find('input').at(0);
	email.simulate('change', 
	{ 
		target: { value: 'example' }
	});

	emailSignUpWrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});
	expect(emailSignUpWrapper).toMatchSnapshot();
	expect(emailSignUpWrapper.state('formError')).toBe('Please check details');
});

// Check if this.props.createUserWithEmail gets called
test('should call createUserWithEmail() from props', () =>
{
	const email = emailSignUpWrapper.find('input').at(0);
	email.simulate('change', 
	{ 
		target: { value: 'example@email.com' }
	});

	const password = emailSignUpWrapper.find('input').at(1);
	password.simulate('change',
	{
		target: { value: 'password' }
	});

	emailSignUpWrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});
	// expect(emailSignUpWrapper).toMatchSnapshot();
	expect(createUserWithEmail).toHaveBeenCalled();
});

// Test for rendering Email Sign Up


// Tests for Submitting Email Sign Up details