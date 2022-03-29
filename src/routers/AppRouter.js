import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Dashboard from '../components/Dashboard';
import AddRecordPage from '../components/AddRecordPage';
import AddMemberPage from '../components/AddMemberPage';
import AddSeasonPage from '../components/AddSeasonPage';
import EditRecordPage from '../components/EditRecordPage';
import EditMemberPage from '../components/EditMemberPage';
import EditSeasonPage from '../components/EditSeasonPage';
import HelpPage from '../components/HelpPage';
import MemberPage from '../components/MemberPage';
import SeasonPage from '../components/SeasonPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Export History to be used in other files
export const history = createHistory();

/**
 * @class We're using <Router> rather than <BrowserRouter> to get 
 * the App history rather than the Browsers
 * 
 * @class <Route> needs a path to link to and a component to render
 * ':id' creates a dynamic way of getting the Sub using the ID. 
 * Setting exact equal to true means that we only get the Dashboard
 * when the route path is typed in.
 * 
 * @class <Switch> goes through the Routes one by one to find a
 * match, from top to bottom. It stops when it finds a match. 
 * NotFoundPage will show for any address that are not found.
 */
const AppRouter = () => (
	<Router history={history}>
		<div>
			<Switch>
				<PublicRoute path='/' component={LoginPage} exact={true} />
				<PrivateRoute path='/dashboard' component={Dashboard} exact={true} />
				<PrivateRoute path='/add-record' component={AddRecordPage} />
				<PrivateRoute path='/add-member' component={AddMemberPage} />
				<PrivateRoute path='/add-season' component={AddSeasonPage}/>
				<PrivateRoute path='/edit-record/:id' component={EditRecordPage} />
				<PrivateRoute path='/edit-member/:id' component={EditMemberPage} />
				<PrivateRoute path='/edit-season/:id' component={EditSeasonPage} />
				<PrivateRoute path='/members' component={MemberPage} />
				<PrivateRoute path='/seasons' component={SeasonPage} />
				<PrivateRoute path='/help' component={HelpPage} />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</Router>
);

export default AppRouter;