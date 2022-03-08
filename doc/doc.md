### How a basic ACTION GENERATOR WORKS
1. Component calls action generator
2. Action generator returns object
3. Component dispatches object
4. Redux store changes

### HOW TO ADD NEW ACTION ###

### NEW RECORD ACTION EXAMPLE ###
1. Add function to actions/records.js (rememeber action.debt is the debt object)
2. Add to record reducer reducers/records.js
3. In AddRecordpage.js add handler 


### How the Updated Action Generator works
1. Component calls action generator
2. Action generator returns function
3. Component dispatches function (?)
4. Function runs (has the ability to dispatch other actions and do whatever it wants)


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
