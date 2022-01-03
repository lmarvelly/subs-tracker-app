/**
 * To use this we need to install the Babel Object Spread Operator
 * Install:
 * 	yarn add babel-plugin-transform-object-rest-spread@6.23.0
 * Need to add this line to Babel.rc in plugins:
 * 	"plugins": 
 * 	[
 * 	   "transform-object-rest-spread"
 * 	]
 */

const user = 
{
	name: 'Luke',
	age: '33'
};

console.log( 
{
	...user,
	name: 'Joe', // overwrites name: 'Luke'
	city: 'Cardiff'
}); 

// ERROR: This doesn't work because the spread operator isn't in 
// curly brackats
// console.log( ...user );