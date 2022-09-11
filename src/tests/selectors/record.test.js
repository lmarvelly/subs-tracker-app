import moment from 'moment';
import selectRecord from '../../selectors/records';
import { records, members, seasons, } from '../fixtures/fixures';

test('Should filter desciptions by text value', () =>
{
	const filters = {
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: 'train',
		memberTextFilter: '',
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: undefined
	};

	const result = selectRecord(records, members, filters);

	expect(result).toEqual([ records[0], records[1] ]);
});

test('Should filter desciptions by advanced text value', () =>
{
	const filters = {
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: 'ub rain',
		memberTextFilter: '',
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: undefined
	};

	const result = selectRecord(records, members, filters);

	expect(result).toEqual([ records[0], records[1] ]);
});

test('Should filter by startDate', () =>
{
	const filters = 
	{
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: '',
		memberTextFilter: '',
		sortBy: 'dateAscending',
		startDate: moment(0),
		endDate: undefined
	}

	const result = selectRecord( records, members, filters );

	expect(result).toEqual([records[5], records[2], records[4], records[0] ]);
});


test('Should filter by startDate', () =>
{
	const filters = 
	{
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: '',
		memberTextFilter: '',
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: moment(0)
	}

	const result = selectRecord( records, members, filters );

	expect(result).toEqual([ records[0], records[3], records[1] ]);
});

test('Should sort by dateAscending', () =>
{
	const filters = {
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: '',
		memberTextFilter: '',
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: undefined
	};

	const result = selectRecord(records, members, filters);
	
	expect(result).toEqual([ records[5], records[2], records[4], records[0], records[3], records[1] ]);
});

test('Should sort by dateDescending', () =>
{
	const filters = {
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: '',
		memberTextFilter: '',
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
		sortBy: 'dateDescending',
		startDate: undefined,
		endDate: undefined
	};
	const result = selectRecord(records, members, filters);

	expect(result).toEqual([ records[1], records[4], records[5] ]);
});

test('Should filter by member simple text filter 2', () =>
{
	const filters = 
	{
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: '',
		memberTextFilter: 'Mar',
		sortBy: 'dateDescending',
		startDate: undefined,
		endDate: undefined
	};
	const result = selectRecord(records, members, filters);

	expect(result).toEqual([ records[0] ]);
});

test('Should filter by member advanced text filter 1', () =>
{
	const filters = 
	{
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: '',
		memberTextFilter: 'Luk Mar',
		sortBy: 'dateDescending',
		startDate: undefined,
		endDate: undefined
	};
	const result = selectRecord(records, members, filters);

	expect(result).toEqual([ records[0] ]);
});

test('Should filter by member advanced text filter 2', () =>
{
	const filters = 
	{
		recordTypeFilter: 'ALL',
		sessionNameTextFilter: '',
		memberTextFilter: 'usi son',
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: undefined
	};
	const result = selectRecord(records, members, filters);

	expect(result).toEqual([ records[2], records[3] ]);
});

test('should filter Records by Record Type', () =>
{
	const filters = 
	{
		recordTypeFilter: 'DEBT',
		sessionNameTextFilter: '',
		memberTextFilter: '',
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: undefined
	};
	const result = selectRecord(records, members, filters);

	expect(result).toEqual([ records[4], records[0] ]);
});