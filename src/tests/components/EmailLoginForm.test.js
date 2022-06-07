import React from 'react';
import { shallow } from 'enzyme';
import EmailLoginForm from '../../components/EmailLoginForm';

let 
	createUserWithEmail,
	emailLogin,
	optionsWrapper, 
	emailLoginWrapper,
	emailSignUpWrapper;

beforeEach(() =>
{
	createUserWithEmail = jest.fn();
	emailLogin = jest.fn();

	emailLoginWrapper = shallow(
		<EmailLoginForm emailLogin={emailLogin} />);
	emailLoginWrapper.setState({ displayType: 'EMAIL_LOGIN' });

	emailSignUpWrapper = shallow(
		<EmailLoginForm createUserWithEmail={createUserWithEmail} />);
	emailSignUpWrapper.setState({ displayType: 'EMAIL_SIGN_UP' });

	optionsWrapper = shallow(<EmailLoginForm />);
});

/////////////////////////////////////
// EMAIL LOGIN OPTIONS RENDER TEST //
/////////////////////////////////////

test('should render Email Login Options correctly', () => 
{
	expect(optionsWrapper).toMatchSnapshot();
});

////////////////////////////////////
// EMAIL SIGN UP/LOGIN FORM TESTS //
////////////////////////////////////

// No need to do tests for both Sign Up and Login input errors as
// the form is the same. Only the function called when form is 
// submitted is different.
test('should render Email Sign Up form', () => 
{
	expect(emailSignUpWrapper).toMatchSnapshot();
});

test('should render Email Login Form', () =>
{
	expect(emailLoginWrapper).toMatchSnapshot();
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


///////////////////////////////
// EMAIL SIGN UP SUBMIT TEST //
///////////////////////////////

// Check if this.props.createUserWithEmail gets called on Submit
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

	expect(createUserWithEmail).toHaveBeenCalled();
});


//////////////////////////////
// EMAIL LOGIN SUBMIT TESTS //
//////////////////////////////

// Tests for Submitting Email Login details
test('should call emailLogin() when submitted', () => 
{
	const email = emailLoginWrapper.find('input').at(0);
	email.simulate('change', 
	{ 
		target: { value: 'example@email.com' }
	});

	const password = emailLoginWrapper.find('input').at(1);
	password.simulate('change',
	{
		target: { value: 'password' }
	});

	emailLoginWrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});

	expect(emailLogin).toHaveBeenCalled();
});

