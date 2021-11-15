import React from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';

import AddSubPage from '../components/AddSubPage';
import Dashboard from '../components/Dashboard';


const EditSubPage = () => (
	<div>Edit Sub Page</div>
);

const HelpPage = () => (
	<div>Help Page</div>
);

const NotFoundPage = () => (
	<div>
		Error 404 
		<NavLink to='/'>Go Home</NavLink>
	</div>
);

/**
 * @class NavLink make use of client side routing so we don't have
 * fully page reloads.
 */
const Header = () => (
	<header>
		<h1>Subs Tracker</h1>
		<NavLink to='/' activeClassName='is-active' exact={true}>Home</NavLink>
		<NavLink to='/add' activeClassName='is-active'>Add Sub</NavLink>
		<NavLink to='/edit' activeClassName='is-active'>Edit Sub</NavLink>
		<NavLink to='/help' activeClassName='is-active'>Help Page</NavLink>
	</header>
);

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