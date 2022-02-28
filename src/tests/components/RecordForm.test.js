import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import RecordForm from '../../components/RecordForm';
import { records, members, seasons } from '../fixtures/fixures';

let wrapper, altWrapper, paymentWrapper, debtWrapper;

beforeEach( () =>
{
	wrapper = shallow(<RecordForm members={[]} seasons={[]} />);
	altWrapper = shallow(<RecordForm members={ members } seasons={ seasons } />);
	paymentWrapper = shallow(<RecordForm record={records[1]} members={ members } seasons={ seasons } />);
	debtWrapper = shallow(<RecordForm record={records[0]} members={ members } seasons={ seasons } />);
});

test('should render Record Form component correctly', () => 
{
	expect(wrapper).toMatchSnapshot();
});

test('should render Record Form with member and season data', () => 
{
	expect(altWrapper).toMatchSnapshot();
});

test('should render Record Form with Record, member and season data', () =>
{
	expect(debtWrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => 
{
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

// TODO: not working properly. Not changing amount. This may need to use render or mount instead
test('Should set amount if input data is valid', () =>
{
	const value = '1';
	const input = paymentWrapper.find('input').at(1);

	input.simulate('change',
	{
		target: { value }
	});

	console.log('Input Value:', input.value);

	expect(input.value).toBe(value);
	// wrapper.find('#amountToPay').at(0).prop('onChange')({target: { value }});
	// expect(wrapper.state('amount')).toEqual(value);

	// expect(wrapper.state('amount')).toBe(value);
});

test('Should not set amount if input data is invalid', () =>
{
	const value = '10.001';
	const input = paymentWrapper.find('input').at(1);

	input.simulate('change',
	{
		target: { value }
	});

	expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission for a Debt', () => 
{
	const onSubmitSpy = jest.fn();
	const wrapper = shallow(
		<RecordForm 
			record={records[0]} 
			onSubmit={onSubmitSpy}
			members={[]} 
			seasons={[]} 
		/>);
	
	wrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});

	expect(wrapper.state('error')).toBe('');
	expect(onSubmitSpy).toHaveBeenLastCalledWith(
	{
		id: records[0].id,
		playerUuid: records[0].playerUuid,
		seasonUuid: records[0].seasonUuid,
		recordType: records[0].recordType,
		description: records[0].description,
		note: records[0].note,
		createdAt: records[0].createdAt,
		amountOwed: records[0].amountOwed,
		amountPaid: records[0].amountPaid
	});
});

test('should call onSubmit prop for valid form submission for a Payment', () => 
{
	const onSubmitSpy = jest.fn();
	const wrapper = shallow(
		<RecordForm 
			record={records[1]} 
			onSubmit={onSubmitSpy}
			members={[]} 
			seasons={[]} 
		/>);
	
	wrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});

	expect(wrapper.state('error')).toBe('');
	expect(onSubmitSpy).toHaveBeenLastCalledWith(
	{
		id: records[1].id,
		playerUuid: records[1].playerUuid,
		seasonUuid: records[1].seasonUuid,
		recordType: records[1].recordType,
		description: records[1].description,
		note: records[1].note,
		createdAt: records[1].createdAt,
		amount: records[1].amount
	});
});

test('should set up new date on date change', () => 
{
	const now = moment();
	const wrapper = shallow(<RecordForm members={[]} seasons={[]} />);
	wrapper.find('SingleDatePicker').prop('onDateChange')(now);
	expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set up on focus change', () => 
{
	const focused = true;
	const wrapper = shallow(<RecordForm members={[]} seasons={[]} />);
	// Remember to call things as objects
	wrapper.find('SingleDatePicker').prop('onFocusChange')({focused});
	expect(wrapper.state('calenderFocused')).toEqual(focused);
});


// Add tests for all the rest of the inputs/dropdowns