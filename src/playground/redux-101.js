import { createStore } from 'redux';

const store = createStore(( state = { count: 0 } ) =>
{
	return state;
});

console.log(store.getState());

const Redux = () => (
	<div>Redux</div>
);

export default Redux;

// Redux Actions
// Actions are objects that get sent to the store