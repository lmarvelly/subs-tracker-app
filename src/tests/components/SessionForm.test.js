import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import SessionForm from '../../components/SessionForm';
import { members, seasons } from '../fixtures/fixures';

let emptyWrapper, wrapper;

beforeEach( () =>
{
	emptyWrapper = shallow(
		<SessionForm members={[]} seasons={[]} />
	);

	wrapper = shallow(
		<SessionForm members={members} seasons={seasons} />
	);
});

test('should render empty SessionForm component', () =>
{
	expect(emptyWrapper).toMatchSnapshot();
});

test('should render SessionForm component with seasons and members', () =>
{
	expect(wrapper).toMatchSnapshot();
});

test('should render error for not inputing any values form submission', () => 
{
	wrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});
	expect( wrapper.state('error').length ).toBeGreaterThan(0);
	expect( wrapper ).toMatchSnapshot();
});

test('should only render season and amount error messages', () => 
{
	// description input
	wrapper.find('#description').simulate('change',
	{
		target: { value: 'New description' } // Setting the value of e.target.value
	});

	wrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});
	
	expect(wrapper).toMatchSnapshot();
});