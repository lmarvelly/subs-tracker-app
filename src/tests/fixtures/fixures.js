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
	sessionName: 'Training subs',
	note: 'To be paid next week',
	createdAt: 0,
	amount: 400
},
{
	playerUuid: members[1].playerUuid,
	seasonUuid: seasons[1].seasonUuid,
	id: 'record2',
	recordType: 'PAYMENT',
	sessionName: 'Training subs',
	note: '',
	createdAt: moment(0).subtract(4, 'days').valueOf(),
	amount: 400
},
{
	playerUuid: members[2].playerUuid,
	seasonUuid: seasons[2].seasonUuid,
	id: 'record3',
	recordType: 'PAYMENT',
	sessionName: '5s subs',
	note: '',
	createdAt: moment(0).add(4, 'days').valueOf(),
	amount: 500
},
{
	playerUuid: members[2].playerUuid,
	seasonUuid: seasons[0].seasonUuid,
	id: 'record4',
	recordType: 'PAYMENT',
	sessionName: 'Donation',
	note: '',
	createdAt: moment(0).subtract(3, 'days').valueOf(),
	amount: 5000
},
{
	playerUuid: members[1].playerUuid,
	seasonUuid: seasons[1].seasonUuid,
	id: 'record5',
	recordType: 'DEBT',
	sessionName: 'Glasgow',
	note: '',
	createdAt: moment(0).add(3, 'days').valueOf(),
	amount: 7500
},
{
	playerUuid: members[1].playerUuid,
	seasonUuid: seasons[1].seasonUuid,
	id: 'record6',
	recordType: 'PAYMENT',
	sessionName: 'Glasgow',
	note: '',
	createdAt: moment(0).add(4, 'days').valueOf(),
	amount: 3500
}
];

export const sessionNames = 
[ 
	{
		sessionName: 'Training', 
		sessionUuid: '123'
	},
	{
		sessionName: 'GFSN Game',  
		sessionUuid: '234'
	},
	{
		sessionName: 'Drocks Game',
		sessionUuid: '345'
	}
];

export const sessions = 
[{
	amount: 400,
	createdAt: 0,
	id: 'sessionID_1',
	note: '',
	playerList:
	[{
		playerUuid: members[0].playerUuid,
		discount: 0
	},
	{
		playerUuid: members[1].playerUuid,
		discount: 0
	},
	{
		playerUuid: members[2].playerUuid,
		discount: 100
	},
	{
		playerUuid: members[3].playerUuid,
		discount: 50
	}],
	recordType: 'SESSION',
	seasonUuid: seasons[0].seasonUuid,
	sessionName: sessionNames[0].sessionName
}]

export const sessionArray =
[
	{ playerUuid: members[0], type: "PAYMENT" },
	{ playerUuid: members[1], type: "DEBT" },
	{ playerUuid: members[2], type: "DEBT" }
]

export const paymentTypes =
[
	{
		paymentTypeName: 'Bank Transfer',
		paymentTypeUuid: 'payType1'
	},
	{
		paymentTypeName: 'Cash',
		paymentTypeUuid: 'payType2'
	}
]