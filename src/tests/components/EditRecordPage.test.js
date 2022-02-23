import React from 'react';
import { shallow } from 'enzyme';
import { EditRecordPage } from '../../components/EditRecordPage';
import { records, members, seasons } from '../fixtures/fixures';

let editRecord, history, wrapper, wrapper2;

beforeEach( () => 
{
	editRecord = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(
		<EditRecordPage editRecord={editRecord} history={history} />
	);
	wrapper2 = shallow(
		<EditRecordPage 
			seasons={seasons} 
			members={members} 
			editRecord={editRecord} 
			history={history} 
		/>
	);
});

test('should not render edit page without date and should redirect to dashboard', () => {
  ;
});
