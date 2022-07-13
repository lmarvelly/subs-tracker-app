import React from 'react';
import { shallow } from 'enzyme';

import { OtherSettingsPage } from '../../components/OtherSettingsPage';
import { sessionTypes } from '../fixtures/fixures';

let emptyWrapper, completeWrapper;

beforeEach( () =>
{
	emptyWrapper = shallow(<OtherSettingsPage sessionTypes={[]} />);
	completeWrapper = shallow(
		<OtherSettingsPage 
			sessionTypes={sessionTypes}
		/>)
});

test('should render Other Settings Page Correctly', () =>
{ 
	expect(emptyWrapper).toMatchSnapshot();
});

test('should render Other Settings Page correctly with Session Types List', () => 
{
	expect(completeWrapper).toMatchSnapshot();
});

// TODO: Create submit tests