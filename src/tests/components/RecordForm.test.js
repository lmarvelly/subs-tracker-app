import React from 'react';
import { shallow } from 'enzyme';
import RecordForm from '../../components/RecordForm';
import { records, members, seasons } from '../fixtures/fixures';

// TODO render without members or seasons array
test('should render Record Form component correctly', () => 
{
	const wrapper = shallow(<RecordForm members={[]} seasons={[]} />);
	expect(wrapper).toMatchSnapshot();
});

test('should render Record Form with member and season data', () => 
{
	const wrapper = shallow(<RecordForm members={ members } seasons={ seasons } />);
	expect(wrapper).toMatchSnapshot();
});

test('should render Record Form with Record, member and season data', () =>
{
	const wrapper = shallow(<RecordForm record={records[0]} members={ members } seasons={ seasons } />);
	expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => 
{
	const wrapper = shallow(<RecordForm members={[]} seasons={[]} />);
	expect(wrapper).toMatchSnapshot();
	wrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});
	expect( wrapper.state('error').length ).toBeGreaterThan(0);
	expect(wrapper).toMatchSnapshot();
});

test('should test description on input change', () => 
{
	const value = 'New description';
	const wrapper = shallow(<RecordForm members={[]} seasons={[]} />);
	wrapper.find('input').at(0).simulate('change',
	{
		target: { value } // Setting the value of e.target.value
	});

	expect(wrapper.state('description')).toBe(value);
});

// Add tests for all the rest of the inputs/dropdowns