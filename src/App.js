import AppRouter from './routes/AppRouter';
import './styles/styles.scss'; // SASS styles form

import SubsTracker from './playground/mock-app/SubsTracker';
// import './playground/mock-app/database/mockData.js';

function App() 
{
	return (
		<AppRouter />
	);
}

// Mock App
// function App() 
// {
// 	return (
// 		<div className="App">
// 			<SubsTracker />
// 		</div>
// 	);
// }

export default App;