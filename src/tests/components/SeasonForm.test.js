import React from 'react';
import { shallow } from 'enzyme';
import SeasonForm from '../../components/SeasonForm';
import { seasons } from '../fixtures/fixures';

let blankWrapper, completedWrapper, onSeasonNameChange, onSubmit;

beforeEach( () =>
{
	// jest onChange functions
	onSubmit = jest.fn();
	onSeasonNameChange = jest.fn();

	blankWrapper = shallow( <SeasonForm /> );
	completedWrapper = shallow(
		<SeasonForm 
			season={seasons[0]}
			onSeasonNameChange={onSeasonNameChange}
			onSubmit={onSubmit}
		/>
	);
});

test('should render Season Form correctly', () => 
{
	expect(blankWrapper).toMatchSnapshot();
});

test('should render completed Season form', () => 
{
	expect(completedWrapper).toMatchSnapshot();
});

test('should submit and reset form without errors', () => 
{
	completedWrapper.find('.form').simulate('submit',
	{
		preventDefault: () => {}
	});

	expect(completedWrapper.state('seasonName')).toEqual('');
	expect(completedWrapper.state('seasonUuid')).toEqual('');
	expect(completedWrapper.state('error')).toEqual('');
});

// Test incomplete form
test('should render error for not inputing a season name on form submission', () => 
{
	blankWrapper.find('form').simulate('submit', 
	{
		preventDefault: () => {}
	});
	expect( blankWrapper.state('error').length ).toBeGreaterThan(0);
	expect(blankWrapper).toMatchSnapshot();
});

test('should change Season Name', () => 
{
	const name = 'Season 1';
	const input = blankWrapper.find('input');
	input.simulate('change', 
	{
		target: { value: name }
	});

	expect( blankWrapper ).toMatchSnapshot();

	expect( blankWrapper.state('seasonName') ).toEqual(name);
});

test('shouldn\'t change season name if too long', () => 
{
	const season = 'SeasonSeasonSeasonSeasonSeasonSeasonSeasonSeasonSeason';
	const input = blankWrapper.find('input');
	input.simulate('change', 
	{ 
		target: { value: season }
	});

	expect( blankWrapper ).toMatchSnapshot();
	expect( blankWrapper.state('seasonName') ).toEqual('');
});