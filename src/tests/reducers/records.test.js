import recordReducer from '../../reducers/records';

test('should set default state', () => {
	const state = recordReducer( undefined, { type: '@@INIT' } );

	expect( state ).toEqual([]);
});
