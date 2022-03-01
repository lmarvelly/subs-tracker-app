import React from 'react';
import PaymentRecord from './PaymentRecord';
import RecordListFilters from './RecordListFilters';
import RecordTotals from './RecordTotals';

const Dashboard = () => (
	<div>
		<RecordTotals />
		<RecordListFilters />
		<PaymentRecord />
	</div>
);

export default Dashboard;