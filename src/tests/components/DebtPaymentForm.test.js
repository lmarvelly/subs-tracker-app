import React from 'react';
import { shallow } from 'enzyme';
import DebtPaymentForm from '../../components/DebtPaymentForm';

let wrapper;

beforeEach( () =>
{
	wrapper = shallow(<DebtPaymentForm />);
});

test('Should render Debt Payment Form', () => 
{
	expect(wrapper).toMatchSnapshot();
});

test('Should submit', () =>
{
	
});