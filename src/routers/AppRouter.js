import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from '../components/Dashboard';
import AddRecordPage from '../components/AddRecordPage';
import EditRecordPage from '../components/EditRecordPage';
import HelpPage from '../components/HelpPage';
import MembersPage from '../components/MembersPage';
import NotFoundPage from '../components/NotFoundPage';

import Header from '../components/Header';

/**
 * @class <BrowserRouter> can only take on element so all routes
 * need to be inside a div. We do this so we can have a Navbar on 
 * the top of each page
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
	<BrowserRouter>
		<div>
			<Header />
			<Switch>
				<Route path='/' component={Dashboard} exact={true} />
				<Route path='/add' component={AddRecordPage} />
				<Route path='/edit/:id' component={EditRecordPage} />
				<Route path='/members' component={MembersPage} />
				<Route path='/help' component={HelpPage} />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</BrowserRouter>
);

export default AppRouter;