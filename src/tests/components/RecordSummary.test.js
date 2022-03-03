import React from 'react';
import { shallow } from 'enzyme';

// import selectRecords from '../../selectors/records';
import RecordSummary from '../../components/RecordSummary';
// Importing the named export. To dynamically pass in props and make sure it's rendering correctly.
import { PaymentRecord } from '../../components/PaymentRecord';
import { records, members, seasons } from '../fixtures/fixures';

test('should render Record Totals correctly without data', () => 
{ 
	// const wrapper = shallow(<RecordTotals paymentRecord={[]} />);

	// expect(wrapper).toMatchSnapshot();
});