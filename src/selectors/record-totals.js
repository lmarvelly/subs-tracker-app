export default ( records ) =>
{
	let totalIncome = 0;
	let totalDebt = 0;

	const playerTotals = [];

	records.map( record => 
	{
		// Checking if players Uuid has been added to the list. -1 is returned if not
		const index = playerTotals.findIndex( player => player.playerId === record.playerUuid );

		if ( typeof record.amount === 'number' )
		{
			if (record.recordType === 'PAYMENT')
			{
				totalIncome += record.amount;
				if( index === -1 )
				{
					playerTotals.push( { playerId: record.playerUuid, balance: record.amount } );
				}
				else
				{
					playerTotals[index].balance += record.amount; 
				}
			}
			else if (record.recordType === 'DEBT') 
			{
				if( index === -1 )
				{
					playerTotals.push( { playerId: record.playerUuid, balance: -record.amount } );
				}
				else
				{
					playerTotals[index].balance -= record.amount; 
				}
			}
			else if(record.recordType === 'SESSION')
			{
				const amount = record.amount;

				record.playerList.forEach( listedPlayer =>
				{
					// Converting discount into percentage to be paid
					const percentageToPay = 100 - listedPlayer.discount;

					const index = playerTotals.findIndex( player => player.playerId === listedPlayer.playerUuid );
					
					if( index === -1 )
					{
						playerTotals.push( { playerId: listedPlayer.playerUuid, balance: -(record.amount / 100 * percentageToPay) } );
					}
					else
					{
						playerTotals[index].balance -= (record.amount / 100 * percentageToPay); 
					}
				});
			}
		}
	});

	// Working out the total outstanding debt
	playerTotals.forEach(listedPlayer =>
	{
		if(listedPlayer.balance < 0)
		{
			totalDebt -= listedPlayer.balance
		}
	});
	
	return { totalIncome, totalDebt };
}