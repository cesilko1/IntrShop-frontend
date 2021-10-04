import { HOME } from "paths";
import IRoute from "interfaces/Route";

import HomePage from "screens/HomePage/HomePage";

const Routes: IRoute[] = [
	{
		path: HOME,
		exact: true,
		component: HomePage
	}
];

export default Routes;