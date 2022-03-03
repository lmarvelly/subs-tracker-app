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

test('should render Record Totals correctly with empty data arrays', () => 
{
	const wrapper = shallow(
		<RecordSummary 
			recordLength={ 0 } 
			recordTotals=
			{{
				totalIncome: 0,
				totalDebt: 0
			}}
			seasons={[]} 
		/>);

	expect(wrapper).toMatchSnapshot();
});

test('should render Record Totals correctly with data from a single debt record', () => 
{
	const singleRecord = [records[0]];
	const recordSeason = [seasons.find((season) => season.seasonUuid === singleRecord[0].seasonUuid)];
	const totals = recordTotals(singleRecord);
	const length = singleRecord.length;

	const wrapper = shallow(
		<RecordSummary 
			recordLength={ length } 
			recordTotals=
			{{
				totalIncome: totals.totalIncome,
				totalDebt: totals.totalDebt
			}}
			seasons={recordSeason}
		/>
	);

	expect(wrapper).toMatchSnapshot();
});

test('should render Record Totals correctly with data from a single payment record', () => 
{
	const singleRecord = [records[2]];
	const recordSeason = [seasons.find((season) => season.seasonUuid === singleRecord[0].seasonUuid)];
	const totals = recordTotals(singleRecord);
	const length = singleRecord.length;

	const wrapper = shallow(
		<RecordSummary 
			recordLength={ length } 
			recordTotals=
			{{
				totalIncome: totals.totalIncome,
				totalDebt: totals.totalDebt
			}}
			seasons={recordSeason}
		/>
	);

	expect(wrapper).toMatchSnapshot();
});

test('should render Record Totals correctly with multiple records data', () => 
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