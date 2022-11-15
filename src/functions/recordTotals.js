// Designed for a single players records
export const getMemberTotals = ( records, playerUuid = '' ) =>
{
	const playerTotals = { totalPaid: 0, totalDebt: 0 };

	records.map( record => 
	{
		// Check if amount is a number and not an empty String
		if ( typeof record.amount === 'number' )
		{
			// Check the Record Type
			if (record.recordType === 'PAYMENT')
			{
				playerTotals.totalPaid += record.amount;
			}
			else if (record.recordType === 'DEBT')
			{
				playerTotals.totalDebt += record.amount;
			}
			else if(record.recordType === 'SESSION')
			{
				record.playerList.forEach( currentPlayer =>
				{
					console.log(`${currentPlayer.playerUuid} === ${playerUuid} ${currentPlayer.playerUuid === playerUuid}`);
					if( currentPlayer.playerUuid === playerUuid )
					{
						// Converting discount into percentage to be paid
						const percentageToPay = 100 - currentPlayer.discount;
						if (currentPlayer.discount) 
						{
							console.log(`DISCOUNT SESSION ${record.sessionName}`);
							console.log(`Player has ${currentPlayer.discount}% discount`);
						}
						
						const amountToPay = record.amount / 100 * percentageToPay

						playerTotals.totalDebt += amountToPay;
					}
				});
				console.log(record.recordType, record.amount , 'TOTAL:', playerTotals);
			}
		}
	});
	
	return playerTotals;
}


// This code if from the old Member/Season Totals function. Needs modifying to work with Season Totals
export const getSeasonTotals = ( records ) =>
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
}