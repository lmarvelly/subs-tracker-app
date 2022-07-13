import React from 'react';
import { shallow } from 'enzyme';
import { OtherSettingsPage } from '../../components/OtherSettingsPage';

let wrapper;

beforeEach( () =>
{
	wrapper = shallow(<OtherSettingsPage sessionTypes={[]} />)
});

test('should render Other Settings Page Correctly', () =>
{ 
	expect(wrapper).toMatchSnapshot();
})
// Created rendering and submit tests