import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addSeason, editSeason, removeSeason, setSeasons, startAddSeason } from '../../actions/seasons';
import { seasons } from '../fixtures/fixures';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) =>
{
	// const 

	database.ref('subs-tracker/seasons')
		.set({})
		.then(() => done());
});

test('should create a Add Season Action Object', () => 
{
	const action = addSeason(seasons[0]);

	expect(action).toEqual(
	{
		type: 'ADD_SEASON',
		season: seasons[0]
	});
});

test('should edit a Season', () => 
{
	const action = editSeason('abcd', { seasonName: 'New Season' });

	expect( action ).toEqual(
	{
		type: 'EDIT_SEASON',
		seasonUuid: 'abcd',
		updates: { seasonName: 'New Season' }
	});
});


test('should create a Delete Season Action Object', () => 
{
	const action = removeSeason('abc123');

	expect( action ).toEqual(
	{
		type: 'REMOVE_SEASON',
		seasonUuid: 'abc123'
	});
});

test('should add a season to the database', (done) => 
{ 
	const store = createMockStore({});

	const seasonData = { seasonName: '1999/2000' };

	const promise = store.dispatch(startAddSeason(seasonData)).then(() =>
	{
		const actions = store.getActions();
		expect(actions[0]).toEqual(
		{
			type: 'ADD_SEASON',
			season:
			{
				seasonUuid: expect.any(String),
				...seasonData
			}
		});

		return database.ref(`subs-tracker/seasons/${actions[0].season.id}`).once('value');
	});

	promise.then((snapshot) =>
	{
		expect(snapshot.val()).toEqual(
		{
			...defaultSeason 
		});
		done();
	});
});

test('should setup set season action object with data', () => 
{ 
	const action = setSeasons(seasons);
	expect(action).toEqual(
	{
		type: 'SET_SEASONS',
		seasons
	});
});