import moment from 'moment';

const paymentRecordReducerFilterDefaultState = 
{
	memberTextFilter: '',
	playerUuidFilter: '',
	recordTypeFilter: 'ALL',
	seasonFilter: '',
	sessionNameTextFilter: '',
	sortBy: 'dateAscending',

	startDate: null,
	endDate: null
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
		case 'SET_RECORD_TYPE':
			return {
				...state,
				recordTypeFilter: action.recordType
			}

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

		case 'REMOVE_DATE_FILTERS':
			return {
				...state,
				startDate: '',
				endDate: ''
			}

		case 'SET_MEMBER_FILTER_TEXT':
			return {
				...state,
				memberTextFilter: action.text,
				playerUuidFilter: '' // Avoid doubling up member filters 
			}
		
		case 'SET_MEMBER_UUID_FILTER':
			return {
				...state,
				playerUuidFilter: action.playerUuid,
				memberTextFilter: '' // Avoid doubling up member filters 
			}

		case 'SET_SEASON_FILTER':
			return {
				...state,
				seasonFilter: action.seasonUuid
			}
		
		case 'RESET_SEASON_FILTER':
			return {
				...state,
				seasonFilter: ''
			}

		case 'RESET_RECORD_FILTERS':
			return paymentRecordReducerFilterDefaultState;
		default:
			return state;
	}
}