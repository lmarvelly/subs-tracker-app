import moment from 'moment';
import { sortByDateAscending, sortByDateDescending, sortByAmount, setStartDate, setEndDate, setTextFilter } from '../../actions/filters';

test('Should generate Sort By Date Ascending action object', () =>
{
	const action = sortByDateAscending();
	expect(action).toEqual(
	{
		type: 'SORT_BY_DATE_ASCENDING'
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