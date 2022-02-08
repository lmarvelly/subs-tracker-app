import seasonReducer from '../../reducers/seasons';
import { seasons } from '../fixtures/fixures';

test('should set default state', () =>
{
	const state = seasonReducer( undefined, { type: '@@INIT' } );
	console.log(state);

	expect( state ).toEqual([]);
});
