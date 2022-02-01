import selectMembers from '../../selectors/members';
import { members } from '../fixtures/fixures';

test('members should be ascending in alphabetical order', () => 
{
	const filters = 
	{
		sortBy: 'alphabetAsc'
	}

	const result = selectMembers( members, filters );

	expect( result ).toEqual([members[1], members[2], members[0]]);
});

test('members should be in descending alphabetical order', () => 
{
	const filters = 
	{
		sortBy: 'alphabetDesc'
	}

	const result = selectMembers( members, filters );

	expect( result ).toEqual([members[0], members[2], members[1]]);
});

test('should filter by text value and be in alphabetical order', () => 
{
	const filters = 
	{
		sortBy: 'alphabetAsc',
		text: 'ar'
	}

	const result = selectMembers( members, filters );

	expect( result ).toEqual([members[1], members[0]]);
});
