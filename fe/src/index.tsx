import { useContext, useEffect, useState } from 'react';
import Routes from 'routes';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'index.scss';
import { TokenProvider, TokenContext } from 'contexts/TokenContext';
import { UserProvider, UserContext } from 'contexts/UserContext';
import { GlobalAlertProvider } from 'contexts/GlobalAlertContext';
import { ReloadSalesProvider } from 'contexts/ReloadSalesContext';
import Login from 'screens/Login/Login';
import NavbarMenu from 'components/Navbar/NavbarMenu';
import UserApi from 'api/UserApi';
import React from 'react';
import ReactDOM from 'react-dom';
import GlobalAlert from 'components/GlobalAlert/GlobalAlert';
import LoadingAnimation from 'components/LoadingAnimation/LoadingAnimation';

const App: React.FC = () => {
	const [ token, setToken ] = useContext(TokenContext);
	const setUser = useContext(UserContext)[1];
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(()=>{
		const loadData = async () => {
			setLoading(true);
			const loadedUser = await UserApi.getUserData(localStorage.token);
			setLoading(false);
			setUser(loadedUser.data);
			setToken(localStorage.token);
		}
		if(localStorage.token) loadData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	if(!token) return(
		<LoadingAnimation loading={loading}>
			<GlobalAlert/>
			<Login/>
		</LoadingAnimation>
	);

	return(
		<Router>
			<GlobalAlert/>

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
	<ReloadSalesProvider>
		<GlobalAlertProvider>
			<UserProvider>
				<TokenProvider>
					<App/>
				</TokenProvider>
			</UserProvider>
		</GlobalAlertProvider>
	</ReloadSalesProvider>
, document.getElementById('root'));
