import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addMember, editMember, removeMember, setMembers, startAddMember, startSetMembers } from "../../actions/members";
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

test('should add a member to the database', (done) => 
{ 
	const store = createMockStore({});
	const memberData = 
	{
		firstName: 'John', 
		middleNames: 'Nobody', 
		surname: 'Doe', 
		nickname: 'That Guy'
	};

	const promise = store.dispatch(startAddMember(memberData)).then(() =>
	{
		const actions = store.getActions();
		expect(actions[0]).toEqual(
		{
			type: 'ADD_MEMBER',
			member:
			{
				playerUuid: expect.any(String),
				...memberData
			}
		});

		return database.ref(`subs-tracker/members/${actions[0].member.playerUuid}`).once('value');
	});

	promise.then((snapshot) =>
	{
		expect(snapshot.val()).toEqual(
		{
			...memberData 
		});
		done();
	});
	
});

// This is getting the disired result. It's just timing out for some reason
test('should fetch members from firebase', (done) =>
{ 
	const store = createMockStore({});

	store.dispatch(startSetMembers())
	.then(() =>
	{
		const actions = store.getActions();
		console.log(actions[0]);
		console.log({type: 'SET_MEMBERS', members});

		expect(actions[0]).toEqual(
		{
			type: 'SET_MEMBERS',
			members
		});
		done();
	});
});