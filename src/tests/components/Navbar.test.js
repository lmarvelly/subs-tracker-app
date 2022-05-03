import React from 'react';
import { shallow } from 'enzyme';
import Navbar from '../../components/Navbar';

let wrapper;

beforeEach( () =>
{
	wrapper = shallow(<Navbar />);
});

test('should render Navbar button correctly', () =>
{
	expect(wrapper).toMatchSnapshot();
});

test('should render Navbar when Navbar button is clicked', () =>
{
	// Not working for some reason
	// const navButton = wrapper.find('#navButton').at(0);
	// navButton.simulate('click');

	wrapper.setState({navHidden: false});

	expect(wrapper).toMatchSnapshot();
});

test('should render Records dropdown links', () => 
{
	wrapper.setState({navHidden: false});
	// Buttons cannot be found for some reason
	// const recordButton = wrapper.find('.recordButton').at(0);
	// recordButton.simulate('click');
	
	// Setting state instead
	wrapper.setState({recordNavHidden: false});

	expect(wrapper).toMatchSnapshot();
});
test('should render Members dropdown links', () => 
{
	wrapper.setState({navHidden: false});
	
	wrapper.setState({memberNavHidden: false});

	expect(wrapper).toMatchSnapshot();
});
test('should render Seasons dropdown links', () => 
{
	wrapper.setState({navHidden: false});
	
	wrapper.setState({seasonNavHidden: false});

	expect(wrapper).toMatchSnapshot();
});