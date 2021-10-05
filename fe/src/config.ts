import IConfig from 'interfaces/Config';

// Production environment
const Config: IConfig = {
	apiBaseUrl: 'https://intrshop.api.raska-vilem.cz',
	dev: false,
	currency: "Kč"
}

// Development environment
if(process.env.NODE_ENV === 'development') {
	Config.apiBaseUrl = 'http://localhost:3003';
	Config.dev = true;
}

export default Config;