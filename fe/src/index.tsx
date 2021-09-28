import Routes from 'routes';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

const App: React.FC = () => {
	return(
		<Router>
			<Switch>
				{Routes.map((route, key)=>{
					return(
						<Route path={route.path} component={route.component} exact={route.exact} key={key}/>
					);
				})}
			</Switch>
		</Router>
	);
}


ReactDOM.render(<App/>, document.getElementById('root'));
