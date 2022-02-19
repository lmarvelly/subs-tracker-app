import React from 'react';
import { shallow } from 'enzyme';
import RecordForm from '../../components/RecordForm';
import { records, members, seasons } from '../fixtures/fixures';

// TODO render without members or seasons array
test('should render Record Form component correctly', () => 
{
	const wrapper = shallow(<RecordForm members={[]} seasons={[]} />);
	expect(wrapper).toMatchSnapshot();
});

test('should render Record Form with member and season data', () => 
{
	const wrapper = shallow(<RecordForm members={ members } seasons={ seasons } />);
	expect(wrapper).toMatchSnapshot();
});

test('should render Record Form with Record, member and season data', () =>
{
	const wrapper = shallow(<RecordForm record={records[0]} members={ members } seasons={ seasons } />);
	expect(wrapper).toMatchSnapshot();
});