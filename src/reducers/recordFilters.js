import moment from 'moment';

const paymentRecordReducerFilterDefaultState = 
{
	text: '',
	sortBy: 'dateAscending',
	startDate: moment().startOf('month'),
	endDate: moment().endOf('month')	
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
		case 'SET_FILTER_TEXT':
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
		case 'SORT_BY_AMOUNT':
			return { 
				...state, 
				sortBy: 'amount'
			}
		default:
			return state;
	}
}