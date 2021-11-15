import React from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';

import Dashboard from '../components/Dashboard';
import AddSubPage from '../components/AddSubPage';
import EditSubPage from '../components/EditSubPage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';

import Header from '../components/Header';

/**
 * @class <BrowserRouter> can only take on element so all routes
 * need to be inside a div
 * 
 * @class <Route> needs a path to link to and a component to render
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
				<Route path='/add' component={AddSubPage} />
				<Route path='/edit' component={EditSubPage} />
				<Route path='/help' component={HelpPage} />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</BrowserRouter>
);

export default AppRouter;