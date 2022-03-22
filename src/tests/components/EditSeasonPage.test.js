import React from 'react';
import { shallow } from 'enzyme';
import { EditSeasonPage } from '../../components/EditSeasonPage';
import { records, members, seasons } from '../fixtures/fixures';

let season, 
	startEditSeason, 
	startRemoveSeason,
	startSetSeasons,
	history, 
	wrapper, 
	wrapper2;

beforeEach( () => 
{
	season = seasons[1];
	startEditSeason = jest.fn();
	startRemoveSeason = jest.fn();
	startSetSeasons = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(
		<EditSeasonPage history={history} />
	);
	wrapper2 = shallow(
		<EditSeasonPage  
			season={seasons[1]} 
			startEditSeason={startEditSeason}
			startRemoveSeason={startRemoveSeason}
			startSetSeasons={startSetSeasons}
			history={history} 
		/>
	);
});

test('should render edit Season page without data then redirect to the Seasons page', () => 
{
	expect(wrapper).toMatchSnapshot();
	expect(history.push).toHaveBeenLastCalledWith('/seasons');
});

test('should handle render edit page with record data', () => 
{
	expect(wrapper2).toMatchSnapshot();
});

test('should handle onSubmit', () => 
{
	wrapper2.find('SeasonForm').prop('onSubmit')(season);

	expect(history.push).toHaveBeenLastCalledWith('/seasons');
	expect(startEditSeason).toHaveBeenLastCalledWith(season);
});

test('should handle startRemoveSeason', () => 
{
	window.confirm = jest.fn(() => true);
	wrapper2.find('button').at(0).simulate('click');

	expect(history.push).toHaveBeenLastCalledWith('/seasons');
	expect(startRemoveSeason).toHaveBeenCalled();
	expect(startRemoveSeason).toHaveBeenLastCalledWith(season.seasonUuid);
});