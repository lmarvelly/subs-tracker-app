import { addSeason, removeSeason } from '../../actions/seasons';

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

test('should create a Delete Season Action Object', () => 
{
	const action = removeSeason('abc123');

	expect( action ).toEqual(
	{
		type: 'REMOVE_SEASON',
		seasonUuid: 'abc123'
	});
});
