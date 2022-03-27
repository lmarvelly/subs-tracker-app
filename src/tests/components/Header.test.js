import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

let wrapper, startLogout;

beforeEach(() =>
{
	startLogout = jest.fn();
	wrapper = shallow( <Header startLogout={startLogout} /> )
});

test('should render Header correctly', () => 
{
	expect( wrapper ).toMatchSnapshot();
});
test('should trigger startLogout function', () => 
{
	wrapper.find('button').at(0).simulate('click');

	expect(startLogout).toHaveBeenCalled();
});
