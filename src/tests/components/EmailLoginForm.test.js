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

// Doesn't work. Might be because of match validation
test('should show error message for invalid email', () =>
{
	const input = signInWrapper.find('input').at(0);
	const text = 'example';
	input.simulate('change', 
	{ 
		target: { value: text }
	});
	// signInWrapper.setState({email: text});

	expect(signInWrapper.state('formError')).toBe('Please Enter a vaild email');
});

// write test for missing email

// Write test for missing passowrd