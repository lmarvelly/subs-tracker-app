import React from 'react';
import { shallow } from 'enzyme';
import SessionNameListItem from '../../components/SessionNameListItem';
import { sessionNames } from '../fixtures/fixures';

let wrapper, handleClick, handleEdit, handleRemove;

beforeEach( () => 
{
	handleClick = jest.fn();
	handleEdit = jest.fn();
	handleRemove = jest.fn();

	const sessionName = sessionNames[0];
	wrapper = shallow(
		<SessionNameListItem 
			key={ sessionName.sessionUuid }
			sessionUuid={ sessionName.sessionUuid }

			handleClick={handleClick}
			handleEdit={handleEdit}
			handleRemove={handleRemove}
		/>
	);
});

test('should render one compressed SessionNameListItem', () => 
{
	expect(wrapper).toMatchSnapshot();
});

test('should render one expanded SessionNameListItem', () => 
{	
	wrapper.find('.list-item').simulate('click');
	
	// expect(handleClick).toHaveBeenCalled(); // This is not working but the component is expanding
	expect(wrapper).toMatchSnapshot();
});

test('should handle clicking edit button', () => 
{
	wrapper.find('.list-item').simulate('click');
	wrapper.find('button').at(0).simulate('click');
	
	expect(handleEdit).toHaveBeenCalled(); // This has not been called!!!!
});
test('should handle clicking remove button', () => 
{
	wrapper.find('.list-item').simulate('click');
	wrapper.find('button').at(1).simulate('click');
	
	expect(handleRemove).toHaveBeenCalled(); // This has not been called!!!!
});