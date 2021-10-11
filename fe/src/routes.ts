import { HOME, GOODS, SALES, OVERVIEW, USERS } from "paths";
import IRoute from "interfaces/Route";

import HomePage from "screens/HomePage/HomePage";
import Goods from "screens/Goods/Goods";
import Sales from "screens/Sales/Sales";
import Overview from "screens/Overview/Overview";
import Users from "screens/Users/Users";

const Routes: IRoute[] = [
	{
		path: HOME,
		exact: true,
		component: HomePage
	},
	{
		path: GOODS,
		exact: true,
		component: Goods
	},
	{
		path: SALES,
		exact: true,
		component: Sales
	},
	{
		path: OVERVIEW,
		exact: true,
		component: Overview
	},
	{
		path: USERS,
		exact: true,
		component: Users
	}
];

export default Routes;