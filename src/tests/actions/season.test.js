import { addSeason } from '../../actions/seasons';

test('should create member object', () => 
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
