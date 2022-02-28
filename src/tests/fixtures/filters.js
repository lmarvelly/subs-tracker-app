import moment from "moment";

import { seasons } from "./fixures";

const defaultFilters =
{
	descriptionTextFilter: '',
	memberTextFilter: '',
	playerUuid: '',
	sortBy: 'dateAscending',
	startDate: moment().startOf('month'),
	endDate: moment().endOf('month'),
	seasonFilter: ''
}

const altFilters1 =
{
	descriptionTextFilter: '5s',
	memberTextFilter: '',
	sortBy: 'dateDescending',
	startDate: moment(),
	endDate: moment().add( 3, 'days' ),
	seasonFilter: ''
}

const altFilters2 =
{
	descriptionTextFilter: '',
	memberTextFilter: 'Harri',
	sortBy: 'dateDescending',
	startDate: moment(),
	endDate: moment().add( 3, 'days' ),
	seasonFilter: ''
}

const altFilters3 =
{
	descriptionTextFilter: '',
	memberTextFilter: 'Harri',
	sortBy: 'dateDescending',
	startDate: moment(),
	endDate: moment().add( 3, 'days' ),
	seasonFilter: seasons[0].seasonUuid
}

export { defaultFilters, altFilters1, altFilters2, altFilters3 };