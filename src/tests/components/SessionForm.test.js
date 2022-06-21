import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import SessionForm from '../../components/SessionForm';
import { members, seasons } from '../fixtures/fixures';

let emptyWrapper, wrapper;

beforeEach( () =>
{
	emptyWrapper = shallow(
		<SessionForm members={[]} seasons={[]} />
	);

	wrapper = shallow(
		<SessionForm members={members} seasons={seasons} />
	);
});

test('should render empty SessionForm component', () =>
{
	expect(emptyWrapper).toMatchSnapshot();
});

test('should render SessionForm component with seasons and members', () =>
{
	expect(wrapper).toMatchSnapshot();
});

test('should render SessionForm with Session', () =>
{
	// TODO: Render with Session to Edit
});