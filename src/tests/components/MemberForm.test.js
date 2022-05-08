import React from 'react';
import { shallow } from 'enzyme';
import MemberForm from '../../components/MemberForm';
import { members } from '../fixtures/fixures';

let blankWrapper;
let completedWrapper;

beforeEach( () =>
{
	blankWrapper = shallow(<MemberForm />);
	completedWrapper = shallow(<MemberForm member={members[0]} />);
});

test('should render Member Form correctly', () => 
{
	expect(blankWrapper).toMatchSnapshot();
});

test('should render Member form with Member Data', () => 
{
	expect(completedWrapper).toMatchSnapshot();
});