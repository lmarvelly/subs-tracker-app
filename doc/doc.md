### HOW TO ADD NEW ACTION ###

### NEW RECORD ACTION EXAMPLE ###
1. Add function to actions/records.js (rememeber action.debt is the debt object)
2. Add to record reducer reducers/records.js
3. In AddRecordpage.js add handler 



### Commands when firing up Project ###
	cd Documents/Programming/Personal/subs-tracker-app/subs-tracker-app
	yarn dev-server
	yarn test -- --watch


### ADDING NEW MEMBER FUNCTIONALITY ###
1. Create Member Reducer with 
		Add Member
		Edit Member
		Delete/archive Member
2. Write Member Functions
3. Combine reducer with other reducers in Store
4. Test by sending a function to the Store
5. Create Members Page
		Create Members page component
		Add page component to Router
		Add link to the Header
