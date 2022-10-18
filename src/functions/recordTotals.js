export const getMemberTotals = ( totals, memberUuid = '' ) =>
{
	const index = totals.findIndex( player => player.playerId === memberUuid );

	return totals[index];
}

export default ( records ) =>
{
	const playerTotals = [];

	records.map( record => 
	{
		// Checking if players Uuid has been added to the list. -1 is returned if not
		const index = playerTotals.findIndex( player => player.playerId === record.playerUuid );

		if ( typeof record.amount === 'number' )
		{
			if (record.recordType === 'PAYMENT')
			{
				if( index === -1 )
				{
					playerTotals.push( { playerId: record.playerUuid, totalPaid: record.amount, totalDebt: 0 } );
				}
				else
				{
					playerTotals[index].totalPaid += record.amount;
				}
			}
			else if (record.recordType === 'DEBT') 
			{
				if( index === -1 )
				{
					playerTotals.push( { playerId: record.playerUuid, totalDebt: record.amount, totalPaid: 0 } );
				}
				else
				{
					playerTotals[index].totalDebt += record.amount;
				}
			}
			else if(record.recordType === 'SESSION')
			{
				record.playerList.forEach( listedPlayer =>
				{
					// Converting discount into percentage to be paid
					const percentageToPay = 100 - listedPlayer.discount;
					const amountToPay = record.amount / 100 * percentageToPay

					const index = playerTotals.findIndex( player => player.playerId === listedPlayer.playerUuid );
					
					if( index === -1 )
					{
						playerTotals.push( { playerId: listedPlayer.playerUuid, totalPaid: 0, totalDebt: amountToPay } );
					}
					else
					{
						playerTotals[index].totalDebt += amountToPay;
					}
				});
			}
		}
	});
	
	return playerTotals;
}

