import moment from 'moment';

// Fixtures: In the test world, your fixture is the baseline test data
export const records = 
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