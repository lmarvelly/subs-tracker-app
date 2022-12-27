import moment from 'moment';
import selectRecord from '../../selectors/records';
import { records, faultyRecords, sessions, members, seasons, faultySessions } from '../fixtures/fixures';

const allRecords = records.concat(sessions);

test('Should filter Record desciptions by text value', () =>
{
	const filters = {
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: 'train',
		memberTextFilter: '',
		playerUuidFilter: '',
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: undefined
	};

	const result = selectRecord(records, members, filters);

	expect(result).toEqual([ records[0], records[1] ]);
});

test('Should filter Session desciptions by text value', () =>
{
	const filters = {
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: 'train',
		memberTextFilter: '',
		playerUuidFilter: '',
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: undefined
	};

	const result = selectRecord(sessions, members, filters);

	expect(result).toEqual([ sessions[1], sessions[0] ]);
});

test('Should filter All Records by desciptions by text value', () =>
{
	const filters = {
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: 'train',
		memberTextFilter: '',
		playerUuidFilter: '',
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: undefined
	};

	const result = selectRecord(allRecords, members, filters);

	expect(result).toEqual([ sessions[1], records[0], sessions[0], records[1] ]);
});



test('Should filter Record desciptions by advanced text value', () =>
{
	const filters = {
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: 'ub rain',
		memberTextFilter: '',
		playerUuidFilter: '',
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: undefined
	};

	const result = selectRecord(records, members, filters);

	expect(result).toEqual([ records[0], records[1] ]);
});

test('Should filter Session desciptions by advanced text value', () =>
{
	const filters = {
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: 'FS ame',
		memberTextFilter: '',
		playerUuidFilter: '',
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: undefined
	};

	const result = selectRecord(sessions, members, filters);

	expect(result).toEqual([ sessions[2] ]);
});

test('Should filter All Records desciptions by advanced text value 1', () =>
{
	const filters = {
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: 'FS ame',
		memberTextFilter: '',
		playerUuidFilter: '',
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: undefined
	};

	const result = selectRecord(allRecords, members, filters);

	expect(result).toEqual([ sessions[2] ]);
});

test('Should filter All Records desciptions by advanced text value 1', () =>
{
	const filters = {
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: 'ub rain',
		memberTextFilter: '',
		playerUuidFilter: '',
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: undefined
	};

	const result = selectRecord(allRecords, members, filters);

	expect(result).toEqual([ records[0], records[1] ]);
});

test('Should filter by startDate', () =>
{
	const filters = 
	{
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: '',
		memberTextFilter: '',
		playerUuidFilter: '',
		sortBy: 'dateAscending',
		startDate: moment(0),
		endDate: undefined
	}

	const result = selectRecord( allRecords, members, filters );

	expect(result).toEqual([sessions[5], sessions[4], sessions[3], records[5], records[2], records[4], sessions[2], sessions[1], records[0], sessions[0] ]);
});


test('Should filter by startDate', () =>
{
	const filters = 
	{
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: '',
		memberTextFilter: '',
		playerUuidFilter: '',
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: moment(0)
	}

	const result = selectRecord( allRecords, members, filters );

	expect(result).toEqual([ records[0], sessions[0], records[3], records[1] ]);
});

test('Should sort by dateAscending', () =>
{
	const filters = {
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: '',
		memberTextFilter: '',
		playerUuidFilter: '',
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: undefined
	};

	const result = selectRecord(allRecords, members, filters);

	expect(result).toEqual([ sessions[5], sessions[4], sessions[3], records[5], records[2], records[4], sessions[2], sessions[1], records[0], sessions[0], records[3], records[1] ]);
});

test('Should sort by dateDescending', () =>
{
	const filters = {
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: '',
		memberTextFilter: '',
		playerUuidFilter: '',
		sortBy: 'dateDescending',
		startDate: undefined,
		endDate: undefined
	};

	const result = selectRecord(records, members, filters);

	expect(result).toEqual([ records[1], records[3], records[0], records[4], records[5], records[2] ]);
});

test('Should filter by member simple text filter 1', () =>
{
	const filters = 
	{
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: '',
		memberTextFilter: 'Har',
		playerUuidFilter: '',
		sortBy: 'dateDescending',
		startDate: undefined,
		endDate: undefined
	};
	const result = selectRecord(allRecords, members, filters);

	expect(result).toEqual([ records[1], sessions[0], sessions[1], sessions[2], records[4], records[5], sessions[4] ]);
});

test('Should filter by member simple text filter 2', () =>
{
	const filters = 
	{
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: '',
		memberTextFilter: 'Mar',
		playerUuidFilter: '',
		sortBy: 'dateDescending',
		startDate: undefined,
		endDate: undefined
	};
	const result = selectRecord(allRecords, members, filters);

	expect(result).toEqual([ sessions[0], records[0], sessions[1], sessions[2], sessions[3] ]);
});

test('Should filter by member advanced text filter 1', () =>
{
	const filters = 
	{
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: '',
		memberTextFilter: 'Luk Mar',
		playerUuidFilter: '',
		sortBy: 'dateDescending',
		startDate: undefined,
		endDate: undefined
	};
	const result = selectRecord(allRecords, members, filters);

	expect(result).toEqual([ sessions[0], records[0], sessions[1], sessions[2], sessions[3] ]);
});

test('Should filter by member advanced text filter 2', () =>
{
	const filters = 
	{
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: '',
		memberTextFilter: 'usi son',
		playerUuidFilter: '',
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: undefined
	};
	const result = selectRecord(allRecords, members, filters);

	expect(result).toEqual([ sessions[5], sessions[4], records[2], sessions[1], sessions[0], records[3] ]);
});

test('Should filter by member uuid: test 1', () =>
{
	const filters = 
	{
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: '',
		memberTextFilter: '',
		playerUuidFilter: members[0].playerUuid,
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: undefined
	};
	const result = selectRecord(allRecords, members, filters);

	expect(result).toEqual([ sessions[3], sessions[2], sessions[1], records[0], sessions[0] ]);
});

test('Should filter by member uuid: test 2', () =>
{
	const filters = 
	{
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: '',
		memberTextFilter: '',
		playerUuidFilter: members[2].playerUuid,
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: undefined
	};
	const result = selectRecord(allRecords, members, filters);

	expect(result).toEqual([ sessions[5], sessions[4], records[2], sessions[1], sessions[0], records[3] ]);
});

test('should filter Records by Record Type', () =>
{
	const filters = 
	{
		recordTypeFilter: 'DEBT',
		sessionNameTextFilter: '',
		memberTextFilter: '',
		playerUuidFilter: '',
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: undefined
	};
	const result = selectRecord(allRecords, members, filters);

	expect(result).toEqual([ records[4], records[0] ]);
});

test('should filter Records by Record Type', () =>
{
	const filters = 
	{
		recordTypeFilter: 'PAYMENT',
		sessionNameTextFilter: '',
		memberTextFilter: '',
		playerUuidFilter: '',
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: undefined
	};
	const result = selectRecord(allRecords, members, filters);

	expect(result).toEqual([ records[5], records[2], records[3], records[1] ]);
});

test("shouldn't throw any errors if there's faulty data", () => 
{
	const filters = 
	{
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: '',
		memberTextFilter: '',
		playerUuidFilter: '',
		sortBy: 'dateAscending',
		startDate: moment(0),
		endDate: moment(0).add(4, 'days')
	}
	selectRecord(faultyRecords, members, filters); // this should throw no errors
});

test("shouldn't throw any errors if there's faulty Session data", () =>
{
	const filters = 
	{
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: '',
		memberTextFilter: '',
		playerUuidFilter: '',
		sortBy: 'dateAscending',
		startDate: moment(0),
		endDate: moment(0).add(4, 'days')
	}
	selectRecord( faultySessions, members, filters ); // this should throw no errors
});