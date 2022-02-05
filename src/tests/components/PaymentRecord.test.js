import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from '../../store/configureStore';
// Importing the named export. To dynamically pass in props and make sure it's rendering correctly.
import PaymentRecord from '../../components/PaymentRecord';
import { records } from '../fixtures/fixures';

const store = configureStore();

test('should first render PaymentRecord with Payments/Debts', () => 
{
	const wrapper = shallow( <Provider store={store} ><PaymentRecord paymentRecord={records} /></Provider> );
});
