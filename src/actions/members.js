import uuid from uuid();

export const addMember = ( name ) => (
console.log('ADD MEMBER'),
{
	type: 'ADD_MEMBER',
	member:
	{
		name,
		playerID: uuid()
	}
});