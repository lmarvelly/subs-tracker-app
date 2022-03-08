import React from 'react';
import { shallow } from 'enzyme';
import { AddSeasonPage } from '../../components/AddSeasonPage';
import { seasons } from '../fixtures/fixures';

let startAddSeason, season, history, wrapper;

beforeEach( () => 
{
	season = seasons[0];
	startAddSeason = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(
		<AddSeasonPage startAddSeason={startAddSeason} history={history} />
	);
});

test('should render Add Season Page correctly', () => 
{
	expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => 
{
	wrapper.find('SeasonForm').prop('onSubmit')(season);

	expect(history.push).toHaveBeenLastCalledWith('/seasons');
	expect(startAddSeason).toHaveBeenLastCalledWith(season);
});