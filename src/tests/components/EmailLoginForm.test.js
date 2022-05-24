import React from 'react';
import { shallow } from 'enzyme';
import { EmailLoginForm } from '../../components/EmailLoginForm';

let wrapper;

beforeEach(() =>
{
	wrapper = shallow(<EmailLoginForm />);
});

test('should render Email Login Component correctly', () => 
{
	expect(wrapper).toMatchSnapshot();
});
