// New Syntax:
// Gets all the variables in 'firebase' and dumps them into the variable firebase
import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = 
{
	apiKey: "AIzaSyBPoO2oWL1x-24g0lMaIpuImJ3ydSwMgrs",
	authDomain: "subs-tracker-d6bfb.firebaseapp.com",
	databaseURL: "https://subs-tracker-d6bfb-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "subs-tracker-d6bfb",
	storageBucket: "subs-tracker-d6bfb.appspot.com",
	messagingSenderId: "598487712485",
	appId: "1:598487712485:web:4b694627691d75d60e4a0c",
	measurementId: "G-RR8L5DT0YM"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// ref is short for reference
database.ref().set(
{
	name: "Luke Marvelly",
	age: 34,
	job: 'Website Developer',
	location: {
		city: 'Cardiff',
		country: 'Wales'
	}
})
.then(() => // this runs if the syncing was successful
{
	console.log('Data is saved');
})
.catch((e) => // Catch an error
{
	console.log('Whoops something went wrong.', e);
});

// One way to remove data
database.ref('job').remove()
	.then(() => // this runs if the syncing was successful
	{
		console.log('Data was removed');
	})
	.catch((e) => // Catch an error
	{
		console.log('Whoops something went wrong.', e);
	});

// This is the prefered way to update data, rather than using set()
database.ref().update(
{
	job: 'Software Engineer',
	location:
	{
		city: 'Aberystwyth'
	}
});
// This is the same as above but using a different syntax
database.ref().update(
{
	job: 'Software Engineer',
 	'job/company': 'Amazon',
	'location/city': 'Aberystwyth'
});

// Retreving data. To get more precise data you can add a String
// to ref() i.e. reft('location/city')
database.ref()
	.once('value')
	.then((snapshot) =>
	{
		const val = snapshot.val();
		console.log(val);
	})
	.catch((e) =>
	{
		console.log('Error fetching data', e);
	});

// Reading data as it changes and only retrieving the data that
// does so
database.ref().on('value', (snapshot) =>
{
	console.log(snapshot.val());
});


// You can unsubscript using off() to changes to save resources
setTimeout(() => {
	database.ref('age').set(35)
}, 3000);

setTimeout(() => {
	database.ref().off();
}, 6000);

setTimeout(() => {
	database.ref('age').set(36)
}, 9000);


// Alternatively you can setup a function 
// This function makes it easy to subscribe and unsubscribe 
const onValueChange = database.ref().on('value', (snapshot) =>
{
	console.log(snapshot.val());
}, (e) =>
{
	console.log('Error with data fetching', e);
});

setTimeout(() => {
	database.ref('age').set(35)
}, 3000);

setTimeout(() => {
	database.ref().off(onValueChange);
}, 6000);

setTimeout(() => {
	database.ref('age').set(36)
}, 9000);


// Add a new 'record'
database.ref('records').push(
{
	recordType: 'PAYMENT',
	playerUuid: 'bbc223',
	seasonUuid: 'season2',
	sessionName: 'TRAINING',
	note: '',  
	createdAt: 500,

	amountOwed: '',
	amountPaid: '',
	amount: 400
});



// Remove child
database.ref('records').on('child_removed', (snapshot) =>
{
	console.log(snapshot.key, snapshot.val());
});

// Change child
database.ref('records').on('child_changed', (snapshot) =>
{
	console.log(snapshot.key, snapshot.val());
});

// Add child
database.ref('records').on('child_added', (snapshot) =>
{
	console.log(snapshot.key, snapshot.val());
});


// Retrieve all 'records' from database and parsing them
database.ref('records')
	.once('value')
	.then((snapshot) =>
	{
		const records = [];

		snapshot.forEach((childSnapshot) =>
		{
			records.push(
			{
				id: childSnapshot.key,
				...childSnapshot.val()
			});
		});

		console.log(records);
	});