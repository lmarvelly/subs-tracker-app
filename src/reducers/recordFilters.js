import moment from 'moment';

const paymentRecordReducerFilterDefaultState = 
{
	sessionNameTextFilter: '',
	memberTextFilter: '',
	playerUuid: '',
	sortBy: 'dateAscending',
	startDate: moment().subtract(1, 'month'),
	endDate: moment(),
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
				sessionNameTextFilter: action.text 
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
		case 'RESET_RECORD_FILTERS':
			return paymentRecordReducerFilterDefaultState;
		default:
			return state;
	}
}