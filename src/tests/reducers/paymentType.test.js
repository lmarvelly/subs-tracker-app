import paymentTypesReducer from "../../reducers/paymentTypes";
import { paymentTypes } from "../fixtures/fixures";

test('should set the default state', () =>
{ 
	const state = paymentTypesReducer( undefined, { type: '@@INIT' } );

	expect( state ).toEqual([]);
});

test('should add a new Payment Type', () =>
{
	const paymentType = { paymentTypeName: 'Cryptocurrency' };
	const action = { type: 'ADD_PAYMENT_TYPE', paymentType };
	const state = paymentTypesReducer( paymentTypes, action );

	expect( state ).toEqual([ ...paymentTypes, paymentType ]);
});

test('should Set the Payment Types provided', () =>
{
	const action =
	{
		type: 'SET_PAYMENT_TYPES',
		paymentTypes
	}
	const state = paymentTypesReducer( undefined, action );

	expect( state ).toEqual( paymentTypes );
});