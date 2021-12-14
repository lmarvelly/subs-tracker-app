// Create player object thats linked to the subs they've paid
const subsList = 
[
	{
		"uuid":"e82626bd-d15e-446a-b2fb-d292449248ab",
		"playerUuid":"12345",
		"createdAt":1622380833549,
		"paymentType": "newPayment",
		"amount": 4
	},
	{
		"uuid":"bd9962be-54f2-4b62-85df-b6842f98b084",
		"playerUuid":"23456",
		"createdAt":1622379856853,
		"paymentType": "moneyOwing",
		"amount": 4
	},
	{
		"uuid":"bd9962be-54f2-4b62-85df-b632432557fd",
		"playerUuid":"34567",
		"createdAt":1622379856800,
		"paymentType": "debtPayment",
		"amount": 4
	},
	{
		"uuid":"b56728b4-7a3f-46a2-b100-2587efaa2f2d",
		"playerUuid":"12345",
		"createdAt":1622378144280,
		"paymentType": "newPayment",
		"amount": 4
	},
	{
		"uuid":"55ca6501-4c5e-40eb-b01c-2db4eb294049",
		"playerUuid":"12345",
		"createdAt":1621352306611,
		"paymentType": "debtPayment",
		"amount": 4
	},
	{
		"uuid":"d8d79f81-09ed-4cad-a4da-b371fe368f14",
		"playerUuid":"34567",
		"createdAt":1622296067850,
		"paymentType": "newPayment",
		"amount": 4
	},
	{
		"uuid":"aedcac42-c3fa-4c54-9fc4-3af5d7a78151",
		"playerUuid":"34567",
		"createdAt":1621352367550,
		"paymentType": "newPayment",
		"amount": 4
	},
	{
		"uuid":"6fbc5bc2-3ffc-4e8d-aeb7-738104851f06",
		"playerUuid":"23456",
		"createdAt":1622295937190,
		"paymentType": "moneyOwing",
		"amount": 4
	}
];

const seasonDatabase = 
{
	"seasons":
	{
		"2021":
		[
			{
				"uuid":"e82626bd-d15e-446a-b2fb-d292449248ab",
				"playerUuid":"12345",
				"createdAt":1622380833549,
				"paymentType": "newPayment",
				"amount": 4
			},
			{
				"uuid":"bd9962be-54f2-4b62-85df-b6842f98b084",
				"playerUuid":"23456",
				"createdAt":1622379856853,
				"paymentType": "moneyOwing",
				"amount": 4
			}
		],
		"2020":
		[
			{
				"uuid":"bd9962be-54f2-4b62-85df-b632432557fd",
				"playerUuid":"34567",
				"createdAt":1622379856800,
				"paymentType": "debtPayment",
				"amount": 4
			},
			{
				"uuid":"b56728b4-7a3f-46a2-b100-2587efaa2f2d",
				"playerUuid":"12345",
				"createdAt":1622378144280,
				"paymentType": "newPayment",
				"amount": 4
			},
			{
				"uuid":"55ca6501-4c5e-40eb-b01c-2db4eb294049",
				"playerUuid":"12345",
				"createdAt":1621352306611,
				"paymentType": "debtPayment",
				"amount": 4
			}
		],
		"2019": 
		[
			{
				"uuid":"d8d79f81-09ed-4cad-a4da-b371fe368f14",
				"playerUuid":"34567",
				"createdAt":1622296067850,
				"paymentType": "newPayment",
				"amount": 4
			},
			{
				"uuid":"aedcac42-c3fa-4c54-9fc4-3af5d7a78151",
				"playerUuid":"34567",
				"createdAt":1621352367550,
				"paymentType": "newPayment",
				"amount": 4
			},
			{
				"uuid":"6fbc5bc2-3ffc-4e8d-aeb7-738104851f06",
				"playerUuid":"23456",
				"createdAt":1622295937190,
				"paymentType": "moneyOwing",
				"amount": 4
			}
		]
	}
};

const membersList =
[
	{
		"uuid":"12345",
		"name":"Luke Marvelly"
	},
	{
		"uuid":"23456",
		"name":"Jason Cusions"
	},
	{
		"uuid":"34567",
		"name":"Harri Messenger"
	}
]

// const seasons = 
// [
// 	{
// 		"uuid":"qwerty",
// 		"name":"2020/2021"
// 	},
// 	{
// 		"uuid":"wertyu",
// 		"name":"2019/2020"
// 	},
// 	{
// 		"uuid":"ertyui",
// 		"name":"2018/2019"
// 	}
// ]

localStorage.setItem( 'subsList', JSON.stringify( subsList ));
localStorage.setItem( 'membersList', JSON.stringify( membersList ));
localStorage.setItem( 'seasonList', JSON.stringify( seasonDatabase ));

console.log('Data connected');

export { subsList, membersList };