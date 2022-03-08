/**
 * Promises are a way of syncing up the asynchronous operations
 * 
 * resolve and reject can only be called once. Any calls  after the
 * first call will be ingnored.
 * @param resolve this is used if the promise has been successful. 
 * @param reject this is used if the promise is not successful
 */
const promise = new Promise((resolve, reject) =>
{
	setTimeout(() => 
	{
		// resolve(
		// {
		// 	name: 'Luke',
		// 	age: 34
		// });
		reject('Whoops! Something went wrong')
	}, 1500);
});

console.log('before');

// This happens after promise is complete
promise.then((data) =>
{
	console.log(data);
})
.catch((error) => // there are different ways to report an error.
{
	console.log('Error:', error);
});

console.log('after');