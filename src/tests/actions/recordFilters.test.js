import moment from 'moment';
import {
	removeDateFilters,
	resetRecordFilters,
	resetSeasonFilter,
	setRecordTypeFilter,
	setStartDate,
	setEndDate,
	setSessionNameTextFilter,
	setMemberFilterText,
	setMemberUuidFilter,
	setSeasonFilter,
	sortByDateAscending,
	sortByDateDescending
} from '../../actions/recordFilters';


test('Should generate Sort By Date Ascending action object', () =>
{
	const action = sortByDateAscending();
	expect(action).toEqual(
	{
		type: 'SORT_BY_DATE_ASCENDING'
	});
});

test('Should generate Sort By Date Descending action object', () =>
{
	const action = sortByDateDescending();
	expect(action).toEqual(
	{
		type: 'SORT_BY_DATE_DESCENDING'
	});
});

test('Should generate Filter By Decription Text action object', () =>
{
	const text = 'Testing text';
	const action = setSessionNameTextFilter(text);
	expect(action).toEqual(
	{
		type: 'SET_DESCRIPTION_FILTER_TEXT',
		text
	});
});

test('Should generate default Filter By Decription Text action object', () =>
{
	const action = setSessionNameTextFilter('');
	expect(action).toEqual(
	{
		type: 'SET_DESCRIPTION_FILTER_TEXT',
		text: ''
	});
});

test('Should generate Set Start Date action object', () =>
{
	const action = setStartDate(moment(0));
	expect(action).toEqual(
	{
		type: 'SET_START_DATE',
		startDate: moment(0)
	});
});

test('Should generate Set End Date action object', () =>
{
	const action = setEndDate(moment(0));
	expect(action).toEqual(
	{
		type: 'SET_END_DATE',
		endDate: moment(0)
	});
});

test('Should generate a Remove Date Filter action object', () =>
{
	const action = removeDateFilters();
	expect(action).toEqual(
	{
		type: 'REMOVE_DATE_FILTERS'
	});
});

test('should generate Filter By Member action object', () => 
{
	const action = setMemberFilterText( '' );
	expect(action).toEqual(
	{
		type: 'SET_MEMBER_FILTER_TEXT',
		text: ''
	});
});

test('should generate default Filter By Member action object', () => 
{
	const text = 'member name';
	const action = setMemberFilterText( text );
	expect(action).toEqual(
	{
		type: 'SET_MEMBER_FILTER_TEXT',
		text
	});
});

test('should generate Filter By Season action object', () => 
{
	const seasonUuid = 'abc123';
	const action = setSeasonFilter( seasonUuid );

	expect(action).toEqual(
	{
		type: 'SET_SEASON_FILTER',
		seasonUuid
	});
});

test('should reset Season Filter', () =>
{
	const action = resetSeasonFilter();

	expect(action).toEqual(
	{
		type: 'RESET_SEASON_FILTER'
	});
});

test('should create a Set Member Uuid action object', () => 
{
	const playerUuid = 'player1';
	const action = setMemberUuidFilter( playerUuid );

	expect(action).toEqual(
	{
		type: 'SET_MEMBER_UUID_FILTER',
		playerUuid
	});
});

test('Should create a Reset Record Filters action object', () =>
{
	const action = resetRecordFilters();

	expect(action).toEqual(
	{
		type: 'RESET_RECORD_FILTERS'
	});
});

test('should create a Set Record Type Filter action object', () =>
{
	const recordType = 'sessions'
	const action = setRecordTypeFilter(recordType);

	expect(action).toEqual(
	{
		type: 'SET_RECORD_TYPE',
		recordType
	});
});