import moment from 'moment';

const paymentRecordReducerFilterDefaultState = 
{
	text: '',
	memberTextFilter: '',
	playerUuid: '',
	sortBy: 'dateAscending',
	startDate: moment().startOf('month'),
	endDate: moment().endOf('month'),
	seasonFilter: ''
};

/**
 * RECORD FILTERS REDUCER
 * 
 * @argument state The current filter state
 * @argument action The action object 
 * 
 * @returns The filter's State with changes ONLY nothing else
 */
export default ( state = paymentRecordReducerFilterDefaultState, action ) =>
{
	switch ( action.type )
	{
		case 'SET_DESCRIPTION_FILTER_TEXT':
			return { 
				...state, 
				text: action.text 
			}
		case 'SORT_BY_DATE_ASCENDING':
			return { 
				...state, 
				sortBy: 'dateAscending'
			}
		case 'SORT_BY_DATE_DESCENDING':
			return { 
				...state, 
				sortBy: 'dateDescending'
			}
		case 'SET_START_DATE': 
			return { 
				...state, 
				startDate: action.startDate 
			}
		case 'SET_END_DATE': 
			return { 
				...state, 
				endDate: action.endDate 
			}
		case 'SET_MEMBER_FILTER_TEXT':
			return {
				...state,
				memberTextFilter: action.text
			}
		case 'SET_SEASON_FILTER':
			return {
				...state,
				seasonFilter: action.seasonUuid
			}
		default:
			return state;
	}
}