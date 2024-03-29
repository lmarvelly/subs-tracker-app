import React from 'react';
import { shallow } from 'enzyme';

import { OtherSettingsPage } from '../../components/OtherSettingsPage';
import { sessionNames, paymentTypes } from '../fixtures/fixures';

let emptyWrapper, completeWrapper;

beforeEach( () =>
{
	emptyWrapper = shallow(
		<OtherSettingsPage 
			sessionNames={[]}
			paymentTypes={[]}
	/>);
	completeWrapper = shallow(
		<OtherSettingsPage 
			sessionNames={sessionNames}
			paymentTypes={paymentTypes}
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