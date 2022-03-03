import React from 'react';
import { shallow } from 'enzyme';

import { RecordSummary } from '../../components/RecordSummary';
// Importing the named export. To dynamically pass in props and make sure it's rendering correctly.
import { records, members, seasons } from '../fixtures/fixures';
import recordTotals from '../../selectors/record-totals';

test('should render Record Totals correctly without data', () => 
{
	const wrapper = shallow(<RecordSummary />);

	expect(wrapper).toMatchSnapshot();
});

test('should render Record Totals correctly with record data', () => 
{
	const totals = recordTotals( records );
	const length = records.length;
	const wrapper = shallow(
		<RecordSummary 
			recordLength={ length } 
			recordTotals=
			{{
				totalIncome: totals.totalIncome,
				totalDebt: totals.totalDebt
			}}
		/>
	);

	expect(wrapper).toMatchSnapshot();
});