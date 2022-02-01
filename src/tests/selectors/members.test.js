import selectMembers from '../../selectors/members';
import { members } from '../fixtures/fixures';

test('should filter by text value', () => 
{
	const filters = 
	{
		sortBy: 'alphabetAsc',
		text: 'ar'
	}

	const result = selectMembers( members, filters );

	expect( result ).toEqual([members[1], members[0]]);
});
