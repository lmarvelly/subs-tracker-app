import React from 'react';
import { shallow } from 'enzyme';
import EmailLoginForm from '../../components/EmailLoginForm';

let 
	createUserWithEmail,
	emailLogin,
	emailLoginWrapper,
	emailSignUpWrapper,
	optionsWrapper,
	resetPassword,
	resetPasswordWrapper;

beforeEach(() =>
{
	createUserWithEmail = jest.fn();
	emailLogin = jest.fn();
	resetPassword = jest.fn();

	emailLoginWrapper = shallow(
		<EmailLoginForm emailLogin={emailLogin} />);
	emailLoginWrapper.setState({ displayType: 'EMAIL_LOGIN' });

	emailSignUpWrapper = shallow(
		<EmailLoginForm createUserWithEmail={createUserWithEmail} />);
	emailSignUpWrapper.setState({ displayType: 'EMAIL_SIGN_UP' });

	optionsWrapper = shallow(<EmailLoginForm />);

	resetPasswordWrapper = shallow(
		<EmailLoginForm resetPassword={resetPassword} />
	);
	resetPasswordWrapper.setState({ displayType:'RESET_PASSWORD' });
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
test('should show error message for missing email', () =>
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

test('should show error message for incorrect email and missing password', () =>
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

test('should call createUserWithEmail() from props on Submit', () =>
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
// EMAIL LOGIN SUBMIT TEST //
//////////////////////////////

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


////////////////////////
// RENDER EMAIL TEST //
////////////////////////

test('should render Reset email wrapper with error that no email has been entered', () =>
{
	expect(resetPasswordWrapper.state('formError')).toBe('');

	expect(resetPasswordWrapper).toMatchSnapshot();
});


////////////////////////////
// RESET EMAIL FORM TESTS //
////////////////////////////

test('should show error for entering incorrect email', () =>
{
	resetPasswordWrapper.find('form').simulate('change',
	{
		target: { value: 'testing' }
	});

	expect(resetPasswordWrapper).toMatchSnapshot();
});

test('should render wrapper without error when a valid email is entered', () => 
{
	resetPasswordWrapper.find('input').at(0).simulate('change',
	{
		target: { value: 'test@example.com' }
	});

	expect(resetPasswordWrapper.state('formError')).toBe('');
	expect(resetPasswordWrapper).toMatchSnapshot();
});


/////////////////////////////////
// RESET PASSWORD SUBMIT TESTS //
/////////////////////////////////

test('should show incorrect email error on Submit attempt', () =>
{
	resetPasswordWrapper.find('input').at(0).simulate('change',
	{
		target: { value: 'testing' }
	});

	resetPasswordWrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});

	expect(resetPasswordWrapper.state('formError')).toBe('Please check email');
});

test('should Submit Reset Password form', () =>
{
	const email = 'testing@email.co.uk';

	resetPasswordWrapper.find('input').at(0).simulate('change',
	{
		target: { value: email }
	});

	resetPasswordWrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});

	expect(resetPassword).toHaveBeenLastCalledWith(email);
});