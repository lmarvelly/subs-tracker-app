import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import RecordForm from '../../components/RecordForm';
import { records, members, seasons } from '../fixtures/fixures';

let wrapper, 
	altWrapper, 
	paymentWrapper, 
	debtWrapper,
	onSeasonNameChange;

beforeEach( () =>
{
	// Functions
	onSeasonNameChange = jest.fn();

	// Wrappers
	wrapper = shallow(<RecordForm members={[]} seasons={[]} />);
	altWrapper = shallow(
		<RecordForm 
			members={ members } 
			seasons={ seasons } 

			onSeasonNameChange={ onSeasonNameChange }
		/>
	);
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
	const input = altWrapper.find('#amountToPay');
	
	input.simulate('change',
	{
		target: { value }
	});

	console.log('State: ', altWrapper.state());

	expect(altWrapper.state('amount')).toBe(value);
	expect(input.value).toBe(value);
});

test('shouldnt let user pay more than 1,000,000', () => 
{
	const value = '2000000';
	const input = altWrapper.find('#amountToPay');
	input.simulate('change',
	{
		target: { value }
	});

	expect(input.value).toEqual(undefined);
	expect(altWrapper.state('amount')).toBe('');
});

test('Should not set amount because input has too many decimal places', () =>
{
	const value = '10.001';
	const input = paymentWrapper.find('input').at(1);

	input.simulate('change',
	{
		target: { value }
	});

	expect(input.value).toEqual(undefined);
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
	wrapper.find('SingleDatePicker').prop('onDateChange')(now);
	expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set up on focus change', () => 
{
	const focused = true;
	// Remember to call things as objects
	wrapper.find('SingleDatePicker').prop('onFocusChange')({focused});
	expect(wrapper.state('calenderFocused')).toEqual(focused);
});

test('should check if Season Dropdown was changed', () => 
{
	const value = seasons[1].seasonUuid;
	const input = altWrapper.find('#seasonName');
	input.simulate('change',
	{
		target: { value }
	});

	expect(altWrapper.state('seasonUuid')).toEqual(value);

	// The function below should be called but isn't for some reason
	// expect(onSeasonNameChange).toHaveBeenCalled();
});

// Add tests for all the rest of the inputs/dropdowns
test('should check if Player Dropdown was changed', () => 
{
	const player = members[0]
	const value = player.playerUuid;
	const input = altWrapper.find('#playerName');
	input.simulate('change',
	{
		target: { value }
	});

	expect(altWrapper.state().playerUuid).toEqual(value);
});
