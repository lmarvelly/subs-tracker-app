import React from 'react';
import { shallow } from 'enzyme';
import RecordForm from '../../components/RecordForm';

test('should render Record Form component correctly', () => 
{
	const wrapper = shallow(<RecordForm members={[]} seasons={[]} />);
	expect(wrapper).toMatchSnapshot();
});
