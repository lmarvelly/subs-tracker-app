import uuid from 'uuid';

// Designed for a single players records
export const getMemberTotals = ( records, playerUuid = '' ) =>
{
	let totalPaid = 0;
	let totalDebt = 0;

	records.map( record => 
	{
		// Check if amount is a number and not an empty String
		if ( typeof record.amount === 'number' )
		{
			// Check the Record Type
			if (record.recordType === 'PAYMENT')
			{
				totalPaid += record.amount;
			}
			else if (record.recordType === 'DEBT')
			{
				totalDebt += record.amount;
			}
			else if(record.recordType === 'SESSION')
			{
				record.playerList.forEach( currentPlayer =>
				{
					if( currentPlayer.playerUuid === playerUuid )
					{
						// Converting discount into percentage to be paid
						const percentageToPay = 100 - currentPlayer.discount;
						
						const amountToPay = record.amount / 100 * percentageToPay

						totalDebt += amountToPay;
					}
				});
			}
		}
	});

	const playerTotals = { totalPaid, totalDebt: 0 };

	if ( totalDebt > totalPaid ) 
	{
		playerTotals.totalDebt = totalDebt - totalPaid;
	}

	return playerTotals;
}

export const getAttendenceTotals = ( records ) =>
{
	const sessionTally = [];

	/**
	 * Iterate through records
	 * 	For each Record check if it's a Session
	 * 		if Record is a Session
	 * 			Check if Session is in sessionTally
	 * 				if doesn't exist ( index === -1 )
	 * 					add new Session to Tally
	 * 				if it does exist
	 * 					add 1 to Session Tally
	 */
	records.forEach(record =>
	{
		if ( record.recordType === 'SESSION' ) 
		{
			const index = sessionTally.findIndex( session => session.sessionName === record.sessionName )

			if (index === -1) 
			{
				sessionTally.push(
				{
					sessionName: record.sessionName,
					sessionUuid: uuid(), // TODO: Refactor to use Sessions Actual UUID
					count: 1
				})
			}
			else
			{
				sessionTally[index] =
				{ 
					sessionName: record.sessionName,
					sessionUuid: uuid(),
					count: ++sessionTally[index].count
				}
			}
		}
		
	});

	return sessionTally;
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