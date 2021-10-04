import { useContext, useEffect } from 'react';
import Routes from 'routes';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'index.scss';
import { TokenProvider, TokenContext } from 'contexts/TokenContext';
import { UserProvider, UserContext } from 'contexts/UserContext';
import Login from 'screens/Login/Login';
import NavbarMenu from 'components/Navbar/NavbarMenu';
import UserApi from 'api/UserApi';
import React from 'react';
import ReactDOM from 'react-dom';

const App: React.FC = () => {
	const [ token, setToken ] = useContext(TokenContext);
	const setUser = useContext(UserContext)[1];

	useEffect(()=>{
		const loadData = async () => {
			const loadedUser = await UserApi.getUserData(localStorage.token);
			setUser(loadedUser.data);
			setToken(localStorage.token);
		}
		if(localStorage.token) loadData();
	}, []);


	if(!token) return(
		<Login/>
	);

	return(
		<Router>
			<NavbarMenu/>

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


ReactDOM.render(
	<UserProvider>
		<TokenProvider>
			<App/>
		</TokenProvider>
	</UserProvider>
, document.getElementById('root'));
