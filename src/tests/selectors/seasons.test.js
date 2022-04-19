import selectSeasons from '../../selectors/seasons';
import { seasons } from '../fixtures/fixures';

test('seasons should be ascending in alphabetical order', () => 
{
	const filters =
	{
		sortBy: 'ascending'
	}
	const result = selectSeasons( seasons, filters );

	expect( result ).toEqual([ seasons[4], seasons[3], seasons[1], seasons[2], seasons[0] ]);
});

test('seasons should be descending in alphabetical order', () => 
{
	const filters =
	{
		sortBy: 'descending'
	}
	const result = selectSeasons( seasons, filters );

	expect( result ).toEqual([ seasons[0], seasons[2], seasons[1], seasons[3], seasons[4] ]);
});

test('should filter by text value and be in descending order', () =>
{
	const filters =
	{
		sortBy: 'descending',
		text: '20'
	}
	const result = selectSeasons( seasons, filters );

	expect( result ).toEqual([ seasons[2], seasons[1], seasons[3], seasons[4] ]);
});

test('should filter by advanced text value and be in descending order', () =>
{
	const filters =
	{
		sortBy: 'ascending',
		text: '20 21'
	}
	const result = selectSeasons( seasons, filters );

	expect( result ).toEqual([ seasons[1], seasons[2] ]);
});
