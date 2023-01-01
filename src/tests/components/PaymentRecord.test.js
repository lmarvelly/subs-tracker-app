import React from 'react';
import { shallow, mount } from 'enzyme';

// Importing the named export. To dynamically pass in props and make sure it's rendering correctly.
import { PaymentRecord } from '../../components/PaymentRecord';
import { records, members, seasons, sessions } from '../fixtures/fixures';
import { defaultFilters } from '../fixtures/filters';

const allRecords = records.concat(sessions);

const startSetRecords = jest.fn();
const startSetSessions = jest.fn();

test('should render PaymentRecord with Payments/Debts', () => 
{
	const wrapper = mount( 
		<PaymentRecord
			startSetRecords={startSetRecords}
			startSetSessions={startSetSessions}

			paymentRecord={records}
			members={members}
			seasons={seasons}
			allRecords={allRecords} 

			recordFilters={defaultFilters}
		/>
	);

	expect(wrapper).toMatchSnapshot();
});

test('should render PaymentRecord with no Payments/Debts', () =>
{
  const wrapper = shallow(<PaymentRecord paymentRecord={[]} sessions={[]} allRecords={[]} />);

  expect(wrapper).toMatchSnapshot();
});
