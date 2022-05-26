import React from 'react';
import { shallow } from 'enzyme';
import SeasonForm from '../../components/SeasonForm';
import { seasons } from '../fixtures/fixures';

let blankWrapper, completedWrapper, onSubmit;

beforeEach( () =>
{
	// jest onChange functions
	onSubmit = jest.fn();

	blankWrapper = shallow( <SeasonForm /> );
	completedWrapper = shallow(
		<SeasonForm 
			season={seasons[0]}
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

test('shouldn\'t show error on submition of completed Member form ', () => 
{
	completedWrapper.find('.form').simulate('submit',
	{
		preventDefault: () => {}
	});

	expect(completedWrapper.state('error')).toEqual('');
});

// Test incomplete form