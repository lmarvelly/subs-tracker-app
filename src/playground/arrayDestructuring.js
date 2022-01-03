// Array Destructuring
let address = ['99 Arabella Street', 'Cardiff', 'West Glamorgan', 'CF23 4EE'];

// For Array destructuring we use SQUARE BRACKETS

// We can destructure everything like this
// const [ street, city, county, postCode ] = address;

// OR we can destructure part like so:
// const [,city,county] = address; // We don't need to include the first or last array elements if we don't need them

// console.log(`You are in ${city}, ${county}`);

address = [];
const [ , , county = 'Ceredigion'] = address; // You can go a step further and leave out values and set defaults

console.log(`You are in ${county}`);


// CHALLENGE
const item = [ 'Coffee (hot)', '£2.00', '£2.50', '£2.75' ];
const [ itemName, smPrice, mdPrice, lgPrice ] = item;

console.log(`A medium ${itemName} costs ${mdPrice}`);