import React from 'react';
import { shallow } from 'enzyme';

// Importing the named export. To dynamically pass in props and make sure it's rendering correctly.
import { PaymentRecord } from '../../components/PaymentRecord';
import { records, members } from '../fixtures/fixures';

test('should render PaymentRecord with Payments/Debts', () => 
{
	const wrapper = shallow( 
		<PaymentRecord paymentRecord={records} members={members} />
	);

	expect(wrapper).toMatchSnapshot();
});

test('should render PaymentRecord with no Payments/Debts', () =>
{
  const wrapper = shallow(<PaymentRecord paymentRecord={[]} />);

  expect(wrapper).toMatchSnapshot();
});
