import moment from 'moment';

export const seasons = 
[
	{
		seasonName: 'Donations', 
		seasonUuid: 'donation'
	},
	{
		seasonName: '2020/2021', 
		seasonUuid: 'season1'
	},
	{
		seasonName: '2021/2022', 
		seasonUuid: 'season2'
	},
	{
		seasonName: '2019/2020', 
		seasonUuid: 'season2'
	}
]

export const members = 
[
	{
		playerUuid: 'player1',
		firstName: 'Luke', 
		middleNames: 'Owen Lloyd', 
		surname: 'Marvelly', 
		nickname: 'Lukio'
	},
	{
		playerUuid: 'player2',
		firstName: 'Harri', 
		middleNames: '', 
		surname: 'Messenger' 
	},
	{
		playerUuid: 'player3',
		firstName: 'Jason', 
		middleNames: '', 
		surname: 'Cousins'
	}
];

// Fixtures: In the test world, your fixture is the baseline test data
export const records = 
[{
	playerUuid: members[0].playerUuid,
	seasonUuid: seasons[2].playerUuid,
	id: 'record1',
	recordType: 'DEBT',
	description: 'Training subs',
	note: '',
	createdAt: 0,
	amount: "",
	amountOwed: 400,
	amountPaid: 0
},
{
	playerUuid: members[1].playerUuid,
	seasonUuid: seasons[1].playerUuid,
	id: 'record2',
	recordType: 'PAYMENT',
	description: 'Training subs',
	note: '',
	createdAt: moment(0).subtract(4, 'days').valueOf(),
	amount: 400,
	amountOwed: '',
	amountPaid: ''
},
{
	playerUuid: members[2].playerUuid,
	seasonUuid: seasons[2].playerUuid,
	id: 'record3',
	recordType: 'PAYMENT',
	description: '5s subs',
	note: '',
	createdAt: moment(0).add(4, 'days').valueOf(),
	amount: 500,
	amountOwed: '',
	amountPaid: ''
},
// {
// 	playerUuid: 'player3',
// 	seasonUuid: 'donation',
// 	id: 'record2',
// 	recordType: 'PAYMENT',
// 	description: 'Donation',
// 	note: '',
// 	createdAt: moment(0).subtract(3, 'days').valueOf(),
// 	amount: 5000,
// 	amountOwed: '',
// 	amountPaid: ''
// }
];