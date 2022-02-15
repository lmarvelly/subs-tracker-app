import { addSeason, editSeason, removeSeason } from '../../actions/seasons';

test('should create a Add Season Action Object', () => 
{
	const action = addSeason({ seasonName: '2021/2022' });

	expect(action).toEqual(
	{
		type: 'ADD_SEASON',
		season:
		{
			seasonName: '2021/2022', 
			seasonUuid: expect.any(String)
		}
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
