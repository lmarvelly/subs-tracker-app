import React from 'react';
import { shallow } from 'enzyme';

// Importing the named export. To dynamically pass in props and make sure it's rendering correctly.
import { PaymentRecord } from '../../components/PaymentRecord';
import { records, members, seasons, sessions } from '../fixtures/fixures';

const allRecords = records.concat(sessions);

test('should render PaymentRecord with Payments/Debts', () => 
{
	const wrapper = shallow( 
		<PaymentRecord paymentRecord={records} members={members} seasons={seasons} sessions={sessions} allRecords={allRecords} />
	);

	expect(wrapper).toMatchSnapshot();
});

test('should render PaymentRecord with no Payments/Debts', () =>
{
  const wrapper = shallow(<PaymentRecord paymentRecord={[]} sessions={[]} allRecords={[]} />);

  expect(wrapper).toMatchSnapshot();
});
