import selectMembers from '../../selectors/members';

const members = 
[
	{
		firstName: 'Luke', 
		middleNames: 'Owen Lloyd', 
		surname: 'Marvelly', 
		nickname: 'Lukio'
	},
	{
		firstName: 'Harri', 
		middleNames: '', 
		surname: 'Messenger' 
	},
	{
		firstName: 'Jason', 
		middleNames: '', 
		surname: 'Cousins'
	}
]

test('should filter by text value', () => 
{
	const filters = 
	{
		sortBy: 'alphabetAsc',
		text: 'ar'
	}

	const result = selectMembers( members, filters );

	expect( result ).toEqual(members[1], members[0])
});
