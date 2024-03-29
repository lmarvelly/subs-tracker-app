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
];

export const faultySeasons = 
[
	{
		seasonName: undefined, 
		seasonUuid: 'donation'
	},
	{
		seasonName: '2020/2021', 
		seasonUuid: undefined
	},
	{
		seasonName: undefined, 
		seasonUuid: undefined
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
	},
	{
		playerUuid: 'player5',
		firstName: 'No', 
		middleNames: 'Records', 
		surname: 'Joe',
		nickname: 'Joey Joe Joe'
	},
];

export const simularMembers =
[
	{
		playerUuid: 'player1',
		firstName: 'Luke', 
		middleNames: 'Owen Lloyd', 
		surname: 'Marvelly', 
		nickname: 'Fluke'
	},
	{
		playerUuid: 'player2',
		firstName: 'Luke', 
		middleNames: 'Owen Lloyd', 
		surname: 'Marvelly', 
		nickname: 'Lukio'
	},
	{
		playerUuid: 'player3',
		firstName: 'Luke', 
		middleNames: 'Owen Lloyd', 
		surname: 'Evans', 
		nickname: 'Fluke'
	},
	{
		playerUuid: 'player4',
		firstName: 'Luke', 
		middleNames: 'Owen Lloyd', 
		surname: 'Evans', 
		nickname: 'Lukio'
	}
];

export const faultyMembers = 
[
	{
		playerUuid: undefined,
		firstName: 'Luke', 
		middleNames: 'Owen Lloyd', 
		surname: 'Marvelly', 
		nickname: 'Lukio'
	},
	{
		playerUuid: 'player2',
		firstName: undefined, 
		middleNames: '', 
		surname: 'Messenger',
		nickname: ''
	},
	{
		playerUuid: 'player3',
		firstName: 'Jason', 
		middleNames: undefined, 
		surname: 'Cousins',
		nickname: 'Oldest Dragon'
	},
	{
		playerUuid: 'player4',
		firstName: 'Jon', 
		middleNames: '', 
		surname: undefined,
		nickname: ''
	},
	{
		playerUuid: 'player5',
		firstName: 'No', 
		middleNames: 'Records', 
		surname: 'Joe',
		nickname: undefined
	},
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
	createdAt: 1, // 01-01-1970
	amount: 400
},
{
	playerUuid: members[1].playerUuid,
	seasonUuid: seasons[1].seasonUuid,
	id: 'record2',
	recordType: 'PAYMENT',
	sessionName: 'Training subs',
	note: '',
	createdAt: moment(0).subtract(4, 'days').valueOf(), // 28-12-1969
	amount: 400
},
{
	playerUuid: members[2].playerUuid,
	seasonUuid: seasons[2].seasonUuid,
	id: 'record3',
	recordType: 'PAYMENT',
	sessionName: '5s subs',
	note: '',
	createdAt: moment(0).add(4, 'days').valueOf(), // 05-01-1970
	amount: 500
},
{
	playerUuid: members[2].playerUuid,
	seasonUuid: seasons[0].seasonUuid,
	id: 'record4',
	recordType: 'PAYMENT',
	sessionName: 'Donation',
	note: '',
	createdAt: moment(0).subtract(3, 'days').valueOf(), // 29-12-1969
	amount: 5000
},
{
	playerUuid: members[1].playerUuid,
	seasonUuid: seasons[1].seasonUuid,
	id: 'record5',
	recordType: 'DEBT',
	sessionName: 'Glasgow',
	note: '',
	createdAt: moment(0).add(3, 'days').valueOf(), // 04-01-1970
	amount: 7500
},
{
	playerUuid: members[1].playerUuid,
	seasonUuid: seasons[1].seasonUuid,
	id: 'record6',
	recordType: 'PAYMENT',
	sessionName: 'Glasgow',
	note: '',
	createdAt: moment(0).add(4, 'days').valueOf(), // 05-01-1970
	amount: 3500
}
];

export const faultyRecords =
[
	{
		playerUuid: undefined,
		seasonUuid: seasons[1].seasonUuid,
		id: 'record6',
		recordType: 'PAYMENT',
		sessionName: 'Glasgow',
		note: '',
		createdAt: moment(0).add(4, 'days').valueOf(), // 05-01-1970
		amount: 3500
	},
	{
		playerUuid: members[1].playerUuid,
		seasonUuid: undefined,
		id: 'record6',
		recordType: 'PAYMENT',
		sessionName: 'Glasgow',
		note: '',
		createdAt: moment(0).add(4, 'days').valueOf(), // 05-01-1970
		amount: 3500
	},
	{
		playerUuid: members[1].playerUuid,
		seasonUuid: seasons[1].seasonUuid,
		id: undefined,
		recordType: 'PAYMENT',
		sessionName: 'Glasgow',
		note: '',
		createdAt: moment(0).add(4, 'days').valueOf(), // 05-01-1970
		amount: 3500
	},
	{
		playerUuid: members[1].playerUuid,
		seasonUuid: seasons[1].seasonUuid,
		id: 'record6',
		recordType: undefined,
		sessionName: 'Glasgow',
		note: '',
		createdAt: moment(0).add(4, 'days').valueOf(), // 05-01-1970
		amount: 3500
	},
	{
		playerUuid: members[1].playerUuid,
		seasonUuid: seasons[1].seasonUuid,
		id: 'record6',
		recordType: 'PAYMENT',
		sessionName: undefined,
		note: '',
		createdAt: moment(0).add(4, 'days').valueOf(), // 05-01-1970
		amount: 3500
	},
	{
		playerUuid: members[1].playerUuid,
		seasonUuid: seasons[1].seasonUuid,
		id: 'record6',
		recordType: 'PAYMENT',
		sessionName: 'Glasgow',
		note: undefined,
		createdAt: moment(0).add(4, 'days').valueOf(), // 05-01-1970
		amount: 3500
	},
	{
		playerUuid: members[1].playerUuid,
		seasonUuid: seasons[1].seasonUuid,
		id: 'record6',
		recordType: 'DEBT',
		sessionName: 'Glasgow',
		note: '',
		createdAt: undefined,
		amount: 3500
	},
	{
		playerUuid: members[1].playerUuid,
		seasonUuid: seasons[1].seasonUuid,
		id: 'record6',
		recordType: 'PAYMENT',
		sessionName: 'Glasgow',
		note: '',
		createdAt: moment(0).add(4, 'days').valueOf(), // 05-01-1970
		amount: undefined
	}
]

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
	createdAt: 0, // 01-01-1970
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
	seasonUuid: seasons[1].seasonUuid,
	sessionName: sessionNames[0].sessionName
},
{
	amount: 400,
	createdAt: moment(0).add(1, 'days').valueOf(), // 02-01-1970
	id: 'sessionID_2',
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
},
{
	amount: 500,
	createdAt: moment(0).add(2, 'days').valueOf(), // 03-01-1970
	id: 'sessionID_3',
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
		playerUuid: members[3].playerUuid,
		discount: 50
	}],
	recordType: 'SESSION',
	seasonUuid: seasons[1].seasonUuid,
	sessionName: sessionNames[1].sessionName
},
{
	amount: 500,
	createdAt: moment(0).add(9, 'days').valueOf(), // 03-01-1970
	id: 'sessionID_4',
	note: '',
	playerList:
	[{
		playerUuid: members[0].playerUuid,
		discount: 0
	},
	{
		playerUuid: members[3].playerUuid,
		discount: 50
	}],
	recordType: 'SESSION',
	seasonUuid: seasons[1].seasonUuid,
	sessionName: sessionNames[2].sessionName
},
{
	amount: 500,
	createdAt: moment(0).add(16, 'days').valueOf(), // 03-01-1970
	id: 'sessionID_5',
	note: '',
	playerList:
	[{
		playerUuid: members[1].playerUuid,
		discount: 0
	},
	{
		playerUuid: members[2].playerUuid,
		discount: 50
	}],
	recordType: 'SESSION',
	seasonUuid: seasons[1].seasonUuid,
	sessionName: sessionNames[2].sessionName
},
{
	amount: 500,
	createdAt: moment(0).add(16, 'days').valueOf(), // 03-01-1970
	id: 'sessionID_6',
	note: '',
	playerList:
	[{
		playerUuid: members[2].playerUuid,
		discount: 50
	}],
	recordType: 'SESSION',
	seasonUuid: seasons[1].seasonUuid,
	sessionName: sessionNames[2].sessionName
}]

export const faultySessions = 
[{
	amount: undefined,
	createdAt: 0, // 01-01-1970
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
	seasonUuid: seasons[1].seasonUuid,
	sessionName: sessionNames[0].sessionName
},
{
	amount: 400,
	createdAt: undefined,
	id: 'sessionID_2',
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
},
{
	amount: 500,
	createdAt: moment(0).add(2, 'days').valueOf(), // 03-01-1970
	id: undefined,
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
		playerUuid: members[3].playerUuid,
		discount: 50
	}],
	recordType: 'SESSION',
	seasonUuid: seasons[1].seasonUuid,
	sessionName: sessionNames[1].sessionName
},
{
	amount: 500,
	createdAt: moment(0).add(9, 'days').valueOf(), // 03-01-1970
	id: 'sessionID_4',
	note: undefined,
	playerList:
	[{
		playerUuid: members[0].playerUuid,
		discount: 0
	},
	{
		playerUuid: members[3].playerUuid,
		discount: 50
	}],
	recordType: 'SESSION',
	seasonUuid: seasons[1].seasonUuid,
	sessionName: sessionNames[2].sessionName
},
{
	amount: 500,
	createdAt: moment(0).add(16, 'days').valueOf(), // 03-01-1970
	id: 'sessionID_5',
	note: '',
	playerList: undefined,
	recordType: 'SESSION',
	seasonUuid: seasons[1].seasonUuid,
	sessionName: sessionNames[2].sessionName
},
{
	amount: 500,
	createdAt: moment(0).add(16, 'days').valueOf(), // 03-01-1970
	id: 'sessionID_6',
	note: '',
	playerList:
	[{
		playerUuid: members[2].playerUuid,
		discount: 50
	}],
	recordType: undefined,
	seasonUuid: seasons[1].seasonUuid,
	sessionName: sessionNames[2].sessionName
},
{
	amount: 500,
	createdAt: moment(0).add(16, 'days').valueOf(), // 03-01-1970
	id: 'sessionID_7',
	note: '',
	playerList:
	[{
		playerUuid: members[2].playerUuid,
		discount: 50
	}],
	recordType: 'DEBT',
	seasonUuid: undefined,
	sessionName: sessionNames[2].sessionName
},
{
	amount: 500,
	createdAt: moment(0).add(16, 'days').valueOf(), // 03-01-1970
	id: 'sessionID_7',
	note: '',
	playerList:
	[{
		playerUuid: members[2].playerUuid,
		discount: 50
	}],
	recordType: 'DEBT',
	seasonUuid: seasons[0].seasonUuid,
	sessionName: undefined
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