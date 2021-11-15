import AppRouter from './routes/AppRouter';
import './styles/styles.scss'; // SASS styles form

import SubsTracker from './SubsTracker';
// import './database/mockData.js';

function App() 
{
	return (
		<AppRouter />
	);
}

// return (
// 	<div className="App">
// 		<SubsTracker />
// 	</div>
// );

export default App;