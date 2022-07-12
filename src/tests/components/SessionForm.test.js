import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import SessionForm from '../../components/SessionForm';
import { members, seasons, sessionArray } from '../fixtures/fixures';

let emptyWrapper,
	onAmountChange,
	onSubmit,
	sessionArrayWrapper,
	wrapper;

beforeEach( () =>
{
	onAmountChange = jest.fn();
	onSubmit =jest.fn();

	emptyWrapper = shallow(
		<SessionForm members={[]} seasons={[]} />
	);

	wrapper = shallow(
		<SessionForm
			members={members}
			seasons={seasons}
			onAmountChange={onAmountChange}
		/>
	);

	sessionArrayWrapper = shallow(
		<SessionForm
			members={members}
			seasons={seasons}
			sessionArray={sessionArray}
			onAmountChange={onAmountChange}
			onSubmit={onSubmit}
		/>
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

test('should only render season, amount and add member error messages', () => 
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
	
	expect( wrapper.state('error').length ).toBeGreaterThan(0);
	expect(wrapper).toMatchSnapshot();
});

test('should only render error message for description and add member', () => 
{
	// Season
	const uuid = seasons[0].seasonUuid;
	const input = wrapper.find('#seasonName');
	input.simulate('change', { target: { value: uuid } });
	// Amount
	const input2 = wrapper.find('#amountToPay');
	input2.simulate('change', { target: {value: '4'} });

	// submit
	wrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});

	expect( wrapper.state('error').length ).toBeGreaterThan(0);
	expect(wrapper).toMatchSnapshot();
});

test('should render "Please enter an Amount" error message for no amount entered', () => 
{
	// Season input
	const seasonUuid = seasons[0].seasonUuid;
	const input = wrapper.find('#seasonName');
	input.simulate('change', { target: { value: seasonUuid } });
	// description input
	wrapper.find('#description').simulate('change',
	{
		target: { value: 'New description' }
	});

	// submit
	wrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});

	expect(wrapper).toMatchSnapshot();
});

test('should not render "Please add members" error message', () => 
{
	// Season input
	const seasonUuid = seasons[0].seasonUuid;
	const input = sessionArrayWrapper.find('#seasonName');
	input.simulate('change', { target: { value: seasonUuid } });
	// description input
	sessionArrayWrapper.find('#description').simulate('change',
	{
		target: { value: 'New description' }
	});
	// Amount input
	const input2 = sessionArrayWrapper.find('#amountToPay');
	input2.simulate('change', { target: {value: '4'} });

	sessionArrayWrapper.setState({sessionArray})

	// submit
	sessionArrayWrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});

	// console.log(sessionArrayWrapper.state('sessionArray'));

	expect(onSubmit).toHaveBeenCalled();
	expect(sessionArrayWrapper).toMatchSnapshot();
});



test('should set description on input change', () => 
{
	const value = 'New description';
	wrapper.find('input').at(0).simulate('change',
	{
		target: { value } // Setting the value of e.target.value
	});

	expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () =>
{
	const value = 'New Note';
	wrapper.find('textarea').at(0).simulate('change',
	{
		target: { value } // setting the value of e.target.value
	});

	expect(wrapper.state('note')).toBe(value);
});

test('Should set amount if input data is valid', () =>
{
	const value = '1';
	const input = wrapper.find('#amountToPay');
	
	input.simulate('change',
	{
		target: { value }
	});

	expect(wrapper.state('amount')).toEqual(value);
});

test('shouldnt let user pay more than 10,000', () => 
{
	const value = '10001';
	const input = wrapper.find('#amountToPay');
	input.simulate('change',
	{
		target: { value }
	});

	expect(input.value).toEqual(undefined);
	expect(wrapper.state('amount')).toEqual('');
});

test('Should not set amount because input has too many decimal places', () =>
{
	const value = '9.001';
	const input = wrapper.find('input').at(0);

	input.simulate('change',
	{
		target: { value }
	});

	expect(input.value).toEqual(undefined);
	expect(wrapper.state('amount')).toBe('');
});