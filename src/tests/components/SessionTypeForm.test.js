import React from 'react';
import { shallow } from 'enzyme';
import SessionTypeForm from '../../components/SessionTypeForm';
import { sessionTypes } from '../fixtures/fixures';

let onSessionNameChange,
	onSubmit,
	wrapper;

beforeEach( () =>
{
	onSessionNameChange = jest.fn();
	onSubmit = jest.fn();

	wrapper = shallow(
		<SessionTypeForm
			onSessionNameChange={onSessionNameChange}
			onSubmit={onSubmit}
		/>
	);
});

test('should render Form correctly', () =>
{
	expect(wrapper).toMatchSnapshot();
});

test('should show error message for incomplete form', () =>
{
	// TODO: write test for submitting incomplete form
});

test('shouldn\'t show error message for complete form and Submit form', () =>
{
	// TODO: write test for complete form
});