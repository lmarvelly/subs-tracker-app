import sessionReducer from '../../reducers/session';
import { session1 } from '../fixtures/fixures';

test('should set default state', () =>
{
	const state = sessionReducer( undefined, { type: '@@INIT' } );

	expect( state ).toEqual([]);
});