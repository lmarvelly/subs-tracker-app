import React from 'react';
import PaymentRecord from './PaymentRecord';
import RecordListFilters from './RecordListFilters';
import RecordSummary from './RecordSummary';

const Dashboard = () => (
	<div>
		<RecordSummary />
		<RecordListFilters />
		<PaymentRecord />
	</div>
);

export default Dashboard;