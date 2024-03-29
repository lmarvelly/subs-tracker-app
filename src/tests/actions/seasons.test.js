import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
	addSeason, 
	editSeason, 
	removeSeason, 
	setSeasons, 
	startAddSeason, 
	startEditSeason, 
	startRemoveSeason, 
	startSetSeasons 
} from '../../actions/seasons';
import { records, seasons } from '../fixtures/fixures';
import database from '../../firebase/firebase';

const uid = 'testuid';
const defaultAuthState = { auth: { uid }}
const createMockStore = configureMockStore([thunk]);

beforeEach((done) =>
{
	records.forEach(({ id, recordType, playerUuid, seasonUuid, 
		sessionName, note, createdAt, amount 
	}) =>
	{
		const recordData = {id, recordType, playerUuid, seasonUuid, 
			sessionName, note, createdAt, amount }

		database.ref(`subs-tracker/users/${uid}/debts_and_payments/${recordData.seasonUuid}/${recordData.id}`)
			.update(recordData)
			.then(() => done());
	}); 


	const seasonsData = {};
	seasons.forEach(({ seasonUuid, seasonName }) =>
	{
		seasonsData[seasonUuid] = { seasonName };
	});

	database.ref(`subs-tracker/users/${uid}/seasons`)
		.set(seasonsData)
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
	const store = createMockStore(defaultAuthState);

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

		return database.ref(`subs-tracker/users/${uid}/seasons/${actions[0].season.seasonUuid}`).once('value');
	});

	promise.then((snapshot) =>
	{
		expect(snapshot.val()).toEqual(
		{
			...seasonData 
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

test('should retreive seasons from database', (done) => 
{ 
	const store = createMockStore(defaultAuthState);

	store.dispatch(startSetSeasons()).then(() =>
	{
		const actions = store.getActions();
		expect(actions[0]).toEqual(
		{
			type: 'SET_SEASONS',
			seasons
		});
		done();
	});
});

// Test is changing Season Name but snapshot is not being returned
test('should edit a season from database', (done) =>
{
	const store = createMockStore(defaultAuthState);
	const seasonUuid = seasons[1].seasonUuid;
	const updates = { seasonName: 'New Kit' };

	store.dispatch(startEditSeason(seasonUuid, updates))
		.then( () =>
		{
			const actions = store.getActions();
			expect(actions[0]).toEqual(
			{
				type: 'EDIT_SEASON',
				seasonUuid,
				updates
			});
			return database.ref(`subs-tracker/users/${uid}/seasons/${seasonUuid}`).once('value');
		})
		.then( (snapshot) =>
		{
			expect(snapshot.val().seasonName).toBe(updates.seasonName);
			done();
		});
});

test('should remove a season with no data from the database', (done) => 
{
	const store = createMockStore(defaultAuthState);
	const seasonUuid = seasons[4].seasonUuid;

	store.dispatch(startRemoveSeason(seasonUuid))
		.then(() =>
		{
			const actions = store.getActions();
			expect(actions[0]).toEqual(
				{
					type: 'REMOVE_SEASON',
					seasonUuid
				});

			return database.ref(`subs-tracker/users/${uid}/seasons/${seasonUuid}`).once('value');
		})
		.then((snapshot) =>
		{
			expect(snapshot.val()).toBeFalsy();
			done();
		});
});

test('Attempt to remove a season with data from the database', (done) => 
{
	const store = createMockStore(defaultAuthState);
	const seasonUuid = seasons[1].seasonUuid;

	store.dispatch(startRemoveSeason(seasonUuid))
		.then(() =>
		{
			const actions = store.getActions();
			expect(actions).toEqual([]);
			done();
		});
});