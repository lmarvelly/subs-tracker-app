import moment from 'moment';
import selectRecord from '../../selectors/records';

const records = 
[{
	playerUuid: '83df2373-3a4e-4198-b428-a6728464bee1',
	id: '1',
	recordType: 'Debt',
	description: 'Training subs',
	note: '',
	createdAt: 0,
	amount: "",
	amountOwed: 400,
	amountPaid: 0
},
{
	playerUuid: '83df2373-3a4e-4198-b428-a6728464bee1',
	id: '2',
	recordType: 'PAYMENT',
	description: 'Training subs',
	note: '',
	createdAt: moment(0).subtract(4, 'days').valueOf(),
	amount: "",
	amountOwed: 400,
	amountPaid: 0
},
{
	playerUuid: '132ffb76-c4ea-4a98-b35f-58e0d090ea1e',
	id: '3',
	recordType: 'PAYMENT',
	description: '5s subs',
	note: '',
	createdAt: moment(0).add(4, 'days').valueOf(),
	amount: "",
	amountOwed: 500,
	amountPaid: 0
}];

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