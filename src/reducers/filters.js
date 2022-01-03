const paymentRecordReducerFilterDefaultState = 
{
	text: '',
	sortBy: 'dateAscending',
	startDate: undefined,
	endDate: undefined
};

/**
 * FILTERS REDUCER
 * 
 * @returns The filter's State with changes ONLY nothing else
 */
export default ( state = paymentRecordReducerFilterDefaultState, action ) =>
{
	switch ( action.type )
	{
		case 'FILTER_TEXT':
			return { 
				...state, 
				text: action.text 
			}
		case 'SORT_BY_DATE_ASCENDING':
			return { 
				...state, 
				sortBy: 'dateAscending'
			}
		case 'SORT_BY_DATE_DECENDING':
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