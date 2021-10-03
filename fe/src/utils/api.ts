import axios from 'axios';
import Config from 'config';

const api = axios.create({
	baseURL: Config.apiBaseUrl,
	headers: {
		"Content-type": "application/json"
	}
});

export default api;