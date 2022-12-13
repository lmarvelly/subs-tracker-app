import React from 'react';
import { shallow } from 'enzyme';

import { MemberAttendence } from '../../components/MemberAttendence';
import { members, records, seasons, sessions } from '../fixtures/fixures';
import { getMemberTotals, getAttendenceTotals, getSeasonTotals } from '../../functions/recordTotals';

test('should display the Default Session Attendence Totals', () =>
{
	// const defaultWraper = shallow();
});
test('should display the correct Session Attendence Totals', () =>
{
	const attendanceTotals = 
	[{
		count: 4, 
		sessionName: "Drocks Training", 
		sessionUuid: "123"
	},
	{
		count: 1, 
		sessionName: "Kickabout", 
		sessionUuid: "234"
	},
	{
		count: 1, 
		sessionName: "GFSN Match", 
		sessionUuid: "345"
	}];

	const wrapper = shallow(
		<MemberAttendence
			seasonSessionTotals={attendanceTotals}
		/>
	);

	expect(wrapper).toMatchSnapshot();
});



