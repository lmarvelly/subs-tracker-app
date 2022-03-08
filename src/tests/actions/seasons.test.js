import { addSeason, editSeason, removeSeason } from '../../actions/seasons';
import { seasons } from '../fixtures/fixures';

test('should create a Add Season Action Object', () => 
{
	const action = addSeason(seasons[0]);

	expect(action).toEqual(
	{
		type: 'ADD_SEASON',
		season: seasons[0]
	});
});

test('should edit a Season', () => 
{
	const action = editSeason('abcd', { seasonName: 'New Season' });

	expect( action ).toEqual(
	{
		type: 'EDIT_SEASON',
		seasonUuid: 'abcd',
		updates: { seasonName: 'New Season' }
	});
});


test('should create a Delete Season Action Object', () => 
{
	const action = removeSeason('abc123');

	expect( action ).toEqual(
	{
		type: 'REMOVE_SEASON',
		seasonUuid: 'abc123'
	});
});
