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

test('should Remove a Payment Type', () => 
{
	const paymentTypeUuid = paymentTypes[0].paymentTypeUuid;
	const action =
	{
		type: 'REMOVE_PAYMENT_TYPE',
		paymentTypeUuid
	}
	const state = paymentTypesReducer( paymentTypes, action );

	const alteredPaymentTypeList = paymentTypes.filter( 
		({paymentTypeUuid}) => paymentTypeUuid !== action.paymentTypeUuid );

	expect(state).toEqual(alteredPaymentTypeList);
});

test('Should Create a Edit Action Generator', () => 
{
	const paymentTypeName = 'Leaves';
	const paymentTypeUuid = paymentTypes[0].paymentTypeUuid;

	const action =
	{
		type: 'EDIT_PAYMENT_TYPE',
		paymentTypeUuid,
		updates:
		{
			paymentTypeName
		}
	};

	const state = paymentTypesReducer( paymentTypes, action );

	expect( state[0].paymentTypeName ).toBe( paymentTypeName )
});