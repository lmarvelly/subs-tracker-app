import moment from 'moment';
import selectRecord from '../../selectors/records';
import { records } from '../fixtures/fixures';

test('Should filter by text value', () =>
{
	const filters = {
		text: 'train',
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: undefined
	};

	const result = selectRecord(records, filters);

	expect(result).toEqual([ records[0], records[1] ]);
});

test('Should filter by startDate', () =>
{
	const filters = 
	{
		text: '',
		sortBy: 'dateAscending',
		startDate: moment(0),
		endDate: undefined
	}

	const result = selectRecord( records, filters );

	expect(result).toEqual([ records[2], records[0] ]);
});


test('Should filter by startDate', () =>
{
	const filters = 
	{
		text: '',
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: moment(0)
	}

	const result = selectRecord( records, filters );

	expect(result).toEqual([ records[0], records[1] ]);
});

test('Should sort by dateAscending', () =>
{
	const filters = {
		text: '',
		sortBy: 'dateAscending',
		startDate: undefined,
		endDate: undefined
	};

	const result = selectRecord(records, filters);

	expect(result).toEqual([ records[2], records[0], records[1] ]);
});

test('Should sort by dateDescending', () =>
{
	const filters = {
		text: '',
		sortBy: 'dateDescending',
		startDate: undefined,
		endDate: undefined
	};

	const result = selectRecord(records, filters);

	expect(result).toEqual([ records[1], records[0], records[2] ]);
});

// Should sort amount