{
	"rules": {
	  ".read": false,
	  ".write": false,
	  "subs-tracker":
	  {
		 "users":
		 {
			"$user_id":
			{
			  ".read": "$user_id === auth.uid",
			  ".write": "$user_id === auth.uid",
			  "main":
			  {
				 "records":
				 {
					"$record_id":
					{
					  ".validate": "newData.hasChildren(['recordType', 'playerUuid', 'seasonUuid', 'description', 'note', 'createdAt', 'amountOwed', 'amountPaid', 'amount'])",
					  "recordType": 
					  {
						 ".validate": "newData.isString() && newData.val().length > 0"
					  }, 
					  "playerUuid": 
					  {
						 ".validate": "newData.isString() && newData.val().length > 0"
					  }, 
					  "seasonUuid": 
					  {
						 ".validate": "newData.isString() && newData.val().length > 0"
					  }, 
					  "description":
					  {
						 ".validate": "newData.isString() && newData.val().length > 0"
					  },
					  "note": 
					  {
						 ".validate": "newData.isString()"
					  }, 
					  "createdAt": 
					  {
						 ".validate": "newData.isNumber()"
					  },
					  "amountOwed": 
					  {
						 ".validate": "newData.isNumber() || newData.val().length === 0"
					  },
					  "amountPaid": 
					  {
						 ".validate": "newData.isNumber() || newData.val().length === 0"
					  }, 
					  "amount":
					  {
						 ".validate": "newData.isNumber() || newData.val().length === 0"
					  },
					  "$other": // Handles any other data 
					  {
						 ".validate": false
					  }
					}
				 },
				 "$other": // Handles if someone tries to inject different data instead of a record
				 {
					".validate": false
				 }
			  },
			  "members":
			  {
				 "$member_id":
				 {
					".validate": "newData.hasChildren(['firstName', 'middleNames', 'surname', 'nickname'])",
					"firstName":
					{
					  ".validate": "newData.isString() && newData.val().length > 0"
					},
					"middleNames":
					{
					  ".validate": "newData.isString()"
					},
					"surname":
					{
					  ".validate": "newData.isString() && newData.val().length > 0"
					},
					"nickname":
					{
					  ".validate": "newData.isString()"
					},
					"$other": // Handles any other data 
					{
					  ".validate": false
					}
				 }
			  },
			  "seasons":
			  {
				 "$season_id":
				 {
					".validate": "newData.hasChildren(['seasonName'])",
					"seasonName":
					{
					  ".validate": "newData.isString() && newData.val().length > 0"
					}
				 }
			  },
			  "$other":
			  {
				 ".validate": false
			  }
			}
		 }
	  }
	}
 }