import moment from "moment";

import { seasons } from "./fixures";

const defaultFilters =
{
	sessionNameTextFilter: '',
	memberTextFilter: '',
	playerUuid: '',
	sortBy: 'dateAscending',
	startDate: moment().startOf('month'),
	endDate: moment().endOf('month'),
	seasonFilter: ''
}

const altFilters1 =
{
	sessionNameTextFilter: '5s',
	memberTextFilter: '',
	sortBy: 'dateDescending',
	startDate: moment(),
	endDate: moment().add( 3, 'days' ),
	seasonFilter: ''
}

const altFilters2 =
{
	sessionNameTextFilter: '',
	memberTextFilter: 'Harri',
	sortBy: 'dateDescending',
	startDate: moment(),
	endDate: moment().add( 3, 'days' ),
	seasonFilter: ''
}

const altFilters3 =
{
	sessionNameTextFilter: '',
	memberTextFilter: 'Harri',
	sortBy: 'dateDescending',
	startDate: moment(),
	endDate: moment().add( 3, 'days' ),
	seasonFilter: seasons[0].seasonUuid
}

const altFilters4 =
{
	sessionNameTextFilter: '',
	memberTextFilter: 'Harri',
	sortBy: 'dateDescending',
	startDate: moment(),
	endDate: moment().add( 3, 'days' ),
	seasonFilter: seasons[1].seasonUuid
}

export { defaultFilters, altFilters1, altFilters2, altFilters3, altFilters4 };