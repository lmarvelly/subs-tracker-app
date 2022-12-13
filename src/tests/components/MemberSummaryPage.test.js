import React from 'react';
import { shallow } from 'enzyme';

import { MemberSummaryPage } from '../../components/MemberSummaryPage'

test('should render empty MemberSummaryPage component', () =>
{
	const recordTotals = { totalDebt: 0, totalPaid: 0 }

	const emptyWrapper = shallow(
		<MemberSummaryPage
			recordTotals = {recordTotals}
			records = {[]}
		/>
	);

	expect( emptyWrapper ).toMatchSnapshot();
});