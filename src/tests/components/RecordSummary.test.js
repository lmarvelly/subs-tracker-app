import React from 'react';
import { shallow } from 'enzyme';

import { RecordSummary } from '../../components/RecordSummary';
// Importing the named export. To dynamically pass in props and make sure it's rendering correctly.
import { records, members, seasons } from '../fixtures/fixures';

test('should render Record Summary correctly without data', () => 
{
	const wrapper = shallow(<RecordSummary />);

	expect(wrapper).toMatchSnapshot();
});

test('should render Record Summary correctly with empty Seasons arrays', () => 
{
	const wrapper = shallow(
		<RecordSummary 
			seasons={[]} 
		/>);

	expect(wrapper).toMatchSnapshot();
});

test('should render Record Summary correctly with data from a single debt record', () => 
{
	const singleRecord = [records[0]];
	const recordSeason = [seasons.find((season) => season.seasonUuid === singleRecord[0].seasonUuid)];
	const length = singleRecord.length;

	const wrapper = shallow(
		<RecordSummary 
			recordLength={ length }
			seasons={ recordSeason }
		/>
	);

	expect(wrapper).toMatchSnapshot();
});

test('should render Record Summary correctly with multiple records data', () => 
{
	const length = records.length;
	const displayedSeasons = 3;

	const wrapper = shallow(
		<RecordSummary 
			recordLength={ length } 
			displayedSeasons={ displayedSeasons }
		/>
	);

	expect(wrapper).toMatchSnapshot();
});