import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

let wrapper, startGoogleLogin;

beforeEach(() =>
{
	startGoogleLogin = jest.fn();

	wrapper = shallow(<LoginPage startGoogleLogin={startGoogleLogin} />);
})

test('should render Login Page correctly', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should test Login button', () => {
	wrapper.find('button').at(0).simulate('click');

	expect(startGoogleLogin).toHaveBeenCalled();
});