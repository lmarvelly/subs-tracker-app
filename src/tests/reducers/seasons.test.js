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
