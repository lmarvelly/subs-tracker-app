export default ( records ) =>
{
	let totalIncome = 0;
	let totalDebt = 0;
	records.map( (record) =>
	{
		if ( typeof record.amount === 'number' ) // if amount is a number
		{
			totalIncome += record.amount;
		}
		if ( typeof record.amountPaid === 'number' ) // if amount is a number
		{
			totalIncome += record.amountPaid;
			totalDebt -= record.amountPaid;
		}
		if ( typeof record.amountOwed === 'number' )
		{
			totalDebt += record.amountOwed;
		}
	});
	
	return { totalIncome, totalDebt };
}