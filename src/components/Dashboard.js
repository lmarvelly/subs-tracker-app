import React from 'react';
import PaymentRecord from './PaymentRecord';
import RecordListFilters from './RecordListFilters';

const Dashboard = () => (
	<div>
		<RecordListFilters />
		<PaymentRecord />
	</div>
);

export default Dashboard;