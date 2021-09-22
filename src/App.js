import './App.css';

import NewMemberForm from './forms/NewMemberForm';
import Season from './Season';
import './database/mockData.js';

function App() 
{
	return (
		<div className="App">
			<NewMemberForm />
			<br />
			<Season />
		</div>
	);
}

export default App;
