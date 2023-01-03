import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import SessionForm from '../../components/SessionForm';
import { members, simularMembers, seasons, sessionArray } from '../fixtures/fixures';

let addSessionName,
	emptyWrapper,
	onAmountChange,
	onSubmit,
	sessionArrayWrapper,
	sessionArrayWrapper2,
	wrapper;

beforeEach( () =>
{
	addSessionName = jest.fn();
	onAmountChange = jest.fn();
	onSubmit =jest.fn();

	emptyWrapper = shallow(
		<SessionForm
			members={[]} 
			seasons={[]}
		/>
	);

	wrapper = shallow(
		<SessionForm
			members={members}
			seasons={seasons}
			addSessionName={addSessionName}
			onAmountChange={onAmountChange}
		/>
	);

	sessionArrayWrapper = shallow(
		<SessionForm
			members={members}
			seasons={seasons}
			sessionArray={sessionArray}
			addSessionName={addSessionName}
			onAmountChange={onAmountChange}
			onSubmit={onSubmit}
		/>
	);

	sessionArrayWrapper2 = shallow(
		<SessionForm
			members={simularMembers}
			seasons={seasons}
			sessionArray={sessionArray}
			addSessionName={addSessionName}
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
	// sessionName input
	wrapper.find('#sessionName').simulate('change',
	{
		target: { value: 'New sessionName' } // Setting the value of e.target.value
	});

	wrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});
	
	expect( wrapper.state('error').length ).toBeGreaterThan(0);
	expect(wrapper).toMatchSnapshot();
});

test('should only render error message for sessionName and add member', () => 
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
	// sessionName input
	wrapper.find('#sessionName').simulate('change',
	{
		target: { value: 'New sessionName' }
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
	sessionArrayWrapper.setState({playerList: [{discount: NaN, playerUuid: 'abc'}]}) // Add Selected players

	sessionArrayWrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});

	expect(sessionArrayWrapper).toMatchSnapshot();
});

test('should set all Form Fields and call onSubmit', () => 
{ 
	const seasonUuid = seasons[0].seasonUuid;
	const input = sessionArrayWrapper.find('#seasonName'); // Select a Season input
	input.simulate('change', { target: { value: seasonUuid } });
	sessionArrayWrapper.find('#sessionName').simulate('change', // sessionName input
	
	{
		target: { value: 'New sessionName' }
	});
	// Amount input
	const input2 = sessionArrayWrapper.find('#amountToPay');
	input2.simulate('change', { target: {value: '4'} });

	sessionArrayWrapper.setState({sessionArray});

	sessionArrayWrapper.setState({playerList: [{discount: NaN, playerUuid: 'abc'}]}) // Add Selected players

	sessionArrayWrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});

	expect(onSubmit).toHaveBeenCalled();
});

// test('should set all Form Fields, organize playerList alpbabetically and and call onSubmit', () => 
// { 
// 	sessionArrayWrapper.setState(
// 	{
// 		id: 'qwerty',
// 		amount: 100,
// 		createdAt: 200,
// 		sessionName: 'Kickabout',
// 		note: '',
// 		seasonUuid: seasons[0].seasonUuid,
// 		playerList: [
// 			{
// 				discount: 0,
// 				playerUuid: members[0].playerUuid
// 			},
// 			{
// 				discount: 0,
// 				playerUuid: members[1].playerUuid
// 			},
// 			{
// 				discount: 0,
// 				playerUuid: members[2].playerUuid
// 			}
// 		]
// 	});

// 	sessionArrayWrapper.find('form').simulate('submit', 
// 	{
// 		preventDefault: () => {}
// 	});

// 	expect(sessionArrayWrapper.state('playerList')).toEqual(
// 		[
// 			{
// 				discount: 0,
// 				playerUuid: members[1].playerUuid
// 			},
// 			{
// 				discount: 0,
// 				playerUuid: members[2].playerUuid
// 			},
// 			{
// 				discount: 0,
// 				playerUuid: members[0].playerUuid
// 			}
// 		]
// 	);
// });

test('should set all Form Fields, organize playerList alpbabetically and and call onSubmit 2', () => 
{
	sessionArrayWrapper2.setState(
	{
		id: 'qwerty',
		amount: 100,
		createdAt: 200,
		sessionName: 'Kickabout',
		note: '',
		seasonUuid: seasons[0].seasonUuid,
		playerList: [
			{
				discount: 0,
				playerUuid: simularMembers[0].playerUuid
			},
			{
				discount: 0,
				playerUuid: simularMembers[1].playerUuid
			},
			{
				discount: 0,
				playerUuid: simularMembers[2].playerUuid
			},
			{
				discount: 0,
				playerUuid: simularMembers[3].playerUuid
			}
		]
	});

	sessionArrayWrapper2.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});

	expect(sessionArrayWrapper2.state('playerList')).toEqual(
		[
			{
				discount: 0,
				playerUuid: simularMembers[2].playerUuid
			},
			{
				discount: 0,
				playerUuid: simularMembers[3].playerUuid
			},
			{
				discount: 0,
				playerUuid: simularMembers[0].playerUuid
			},
			{
				discount: 0,
				playerUuid: simularMembers[1].playerUuid
			}
		]
	);
});

test('should set sessionName on input change', () => 
{
	const value = 'New sessionName';
	wrapper.find('input').at(0).simulate('change',
	{
		target: { value } // Setting the value of e.target.value
	});

	expect(wrapper.state('sessionName')).toBe(value);
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