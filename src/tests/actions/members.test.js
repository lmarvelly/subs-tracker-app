import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addMember, editMember, removeMember, setMembers, startSetMembers } from "../../actions/members";
import { members } from '../fixtures/fixures';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) =>
{
	const membersData = {};
	members.forEach(({ 
		playerUuid = '',
		firstName = '',
		middleNames = '',
		surname = '',
		nickname = ''
	}) =>
	{
		membersData[playerUuid] = 
		{ 
			firstName,
			middleNames,
			surname,
			nickname 
		};
	});

	database.ref('subs-tracker/members')
		.set(membersData)
		.then(() => done());
});

test('Should add a new members. Some have more properties than others', () => 
{
	const action = addMember( members[0] );
	expect(action).toEqual(
	{
		type: 'ADD_MEMBER',
		member: members[0]
	});


	const action2 = addMember( members[1] );
	expect(action2).toEqual(
	{
		type: 'ADD_MEMBER',
		member: members[1]
	});

	const action3 = addMember( members[3] );
	expect(action3).toEqual(
	{
		type: 'ADD_MEMBER',
		member: members[3]
	});
});

test('Should edit a member', () => 
{
	const action = editMember('querty', { nickname: 'The Rock' })

	expect( action ).toEqual(
	{
		type: 'EDIT_MEMBER',
		playerUuid: 'querty',
		updates: { nickname: 'The Rock' }
	})
});

test('Should remove member', () => 
{
	const action = removeMember('abc123');

	expect( action ).toEqual(
	{
		type: 'REMOVE_MEMBER',
		playerUuid: 'abc123'
	});
});

test('should setup set member action object with data', () =>
{
	const action = setMembers(members);
	
	expect(action).toEqual(
	{
		type: 'SET_MEMBERS',
		members
	});
});

test('should fetch members from firebase', (done) =>
{ 
	const store = createMockStore({});

	// not receiving a promise
	store.dispatch(startSetMembers()).then(() =>
	{
		const actions = store.getActions();
		expect(actions[0]).toEqual(
		{
			type: 'SET_MEMBERS',
			members
		});
		done();
	});
});