// Object Destructuring

const person = {
	// name: 'Luke',
	age: 33,
	location: {
		city: 'Cardiff',
		temp: 10
	}
};

// Destructuring and setting 'name' variable to 'firstName' to default to 'Anonymous'
const { name: firstName = 'Anonymous', age } = person;
// Destructing off a nested object and renaming temp variable to temperature
const { city, temp: temperature } = person.location;

console.log(`${firstName} is ${age}`);
console.log(`${city} is ${temperature} OC`);


const book = {
	title: 'Ego is the Enemy',
	author: 'Ryan Holiday',
	publisher: {
		name: 'Penguin'
	}
};

const { name: publisherName = 'Self-Published' } = book.publisher;

console.log(publisherName);