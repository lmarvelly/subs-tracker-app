import moment from 'moment';
import selectRecord from '../../selectors/records';
import { records, members, seasons, } from '../fixtures/fixures';

test('Should filter desciptions by text value', () =>
{
	const filters = {
		descriptionTextFilter: 'train',
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
		descriptionTextFilter: 'ub rain',
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
		descriptionTextFilter: '',
		memberTextFilter: '',
		sortBy: 'dateAscending',
		startDate: moment(0),
		endDate: undefined
	}

	const result = selectRecord( records, members, filters );

	expect(result).toEqual([ records[2], records[4], records[0] ]);
});


test('Should filter by startDate', () =>
{
	const filters = 
	{
		descriptionTextFilter: '',
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
		descriptionTextFilter: '',
		memberTextFilter: '',
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: undefined
	};

	const result = selectRecord(records, members, filters);

	expect(result).toEqual([ records[2], records[4], records[0], records[3], records[1] ]);
});

test('Should sort by dateDescending', () =>
{
	const filters = {
		descriptionTextFilter: '',
		memberTextFilter: '',
		sortBy: 'dateDescending',
		startDate: undefined,
		endDate: undefined
	};

	const result = selectRecord(records, members, filters);

	expect(result).toEqual([ records[1], records[3], records[0], records[4], records[2] ]);
});

test('Should filter by member simple text filter 1', () =>
{
	const filters = 
	{
		descriptionTextFilter: '',
		memberTextFilter: 'Har',
		sortBy: 'dateDescending',
		startDate: undefined,
		endDate: undefined
	};
	const result = selectRecord(records, members, filters);

	expect(result).toEqual([ records[1], records[4] ]);
});

test('Should filter by member simple text filter 2', () =>
{
	const filters = 
	{
		descriptionTextFilter: '',
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
		descriptionTextFilter: '',
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
		descriptionTextFilter: '',
		memberTextFilter: 'usi son',
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: undefined
	};
	const result = selectRecord(records, members, filters);

	expect(result).toEqual([ records[2], records[3] ]);
});