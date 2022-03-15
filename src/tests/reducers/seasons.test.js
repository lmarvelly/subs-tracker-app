import seasonReducer from '../../reducers/seasons';
import { seasons } from '../fixtures/fixures';

test('should set default state', () =>
{
	const state = seasonReducer( undefined, { type: '@@INIT' } );

	expect( state ).toEqual([]);
});

test('should add a new season', () => 
{
	const season = { seasonName: '1999/2000' };
	const action = { type: 'ADD_SEASON', season };
	const state = seasonReducer( seasons, action );

	expect( state ).toEqual([ ...seasons, season ]);
});

test('should edit a seasons name', () =>
{
	const seasonName = '1999/2000';
	const seasonUuid = seasons[1].seasonUuid;

	const action =
	{
		type: 'EDIT_SEASON',
		seasonUuid,
		updates: 
		{
			seasonName
		}
	}

	const state = seasonReducer( seasons, action );

	expect( state[1].seasonName ).toBe( seasonName );
});


test('should remove a season', () => 
{
	const seasonUuid = seasons[1].seasonUuid;
	const action =
	{
		type: 'REMOVE_SEASON',
		seasonUuid
	}
	const state = seasonReducer( seasons, action );
	expect( state ).toEqual([seasons[0], seasons[2], seasons[3]]);
});

test('should set seasons', () => 
{
	const action =
	{
		type: 'SET_SEASONS',
		seasons: [seasons[1]]
	}
	const state = seasonReducer( seasons, action );

	expect( state ).toEqual( [seasons[1]] );
});