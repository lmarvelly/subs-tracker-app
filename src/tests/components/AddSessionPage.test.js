import React from 'react';
import { shallow } from 'enzyme';
import { AddSessionPage } from '../../components/AddSessionPage';
import { members, seasons } from '../fixtures/fixures';

let history, emptyWrapper, wrapper;

beforeEach( () =>
{
	history = { push: jest.fn() };

	emptyWrapper = shallow(
		<AddSessionPage
			history={history}
		/>);

	wrapper = shallow(
		<AddSessionPage 
			members={members} 
			seasons={seasons} 
			history={history}
		/>
	);
});

test('should render AddSessionPage correctly without members or seasons', () =>
{
	expect(emptyWrapper).toMatchSnapshot();
});

test('should render AddSessionPage correctly with members or seasons', () =>
{
	expect(wrapper).toMatchSnapshot();
});

test('should submit', () => 
{
	// TODO: Write submit test/s
})