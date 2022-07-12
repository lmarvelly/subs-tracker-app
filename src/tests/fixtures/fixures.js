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
		seasonUuid: 'season3'
	},
	{
		seasonName: '1999/2000', 
		seasonUuid: 'season4'
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
		surname: 'Messenger',
		nickname: ''
	},
	{
		playerUuid: 'player3',
		firstName: 'Jason', 
		middleNames: '', 
		surname: 'Cousins',
		nickname: 'Oldest Dragon'
	},
	{
		playerUuid: 'player4',
		firstName: 'Jon', 
		middleNames: '', 
		surname: 'Doe',
		nickname: ''
	}
];

// Fixtures: In the test world, your fixture is the baseline test data
export const records = 
[{
	playerUuid: members[0].playerUuid,
	seasonUuid: seasons[2].seasonUuid,
	id: 'record1',
	recordType: 'DEBT',
	description: 'Training subs',
	note: 'To be paid next week',
	createdAt: 0,
	amount: "",
	amountOwed: 400,
	amountPaid: 0
},
{
	playerUuid: members[1].playerUuid,
	seasonUuid: seasons[1].seasonUuid,
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
	seasonUuid: seasons[2].seasonUuid,
	id: 'record3',
	recordType: 'PAYMENT',
	description: '5s subs',
	note: '',
	createdAt: moment(0).add(4, 'days').valueOf(),
	amount: 500,
	amountOwed: '',
	amountPaid: ''
},
{
	playerUuid: members[2].playerUuid,
	seasonUuid: seasons[0].seasonUuid,
	id: 'record4',
	recordType: 'PAYMENT',
	description: 'Donation',
	note: '',
	createdAt: moment(0).subtract(3, 'days').valueOf(),
	amount: 5000,
	amountOwed: '',
	amountPaid: ''
},
{
	playerUuid: members[1].playerUuid,
	seasonUuid: seasons[1].seasonUuid,
	id: 'record5',
	recordType: 'DEBT',
	description: 'Glasgow',
	note: '',
	createdAt: moment(0).add(3, 'days').valueOf(),
	amount: '',
	amountOwed: 7500,
	amountPaid: 3500
}
];

export const sessionArray =
[
	{ playerUuid: members[0], type: "PAYMENT" },
	{ playerUuid: members[1], type: "DEBT" },
	{ playerUuid: members[2], type: "DEBT" }
]

export const sessionTypeList = [ 'Training', 'GFSN Game', 'Drocks Game' ];