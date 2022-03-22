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