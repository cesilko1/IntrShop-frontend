import { HOME, GOODS, SALES } from "paths";
import IRoute from "interfaces/Route";

import HomePage from "screens/HomePage/HomePage";
import Goods from "screens/Goods/Goods";
import Sales from "screens/Sales/Sales";

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
	}
];

export default Routes;