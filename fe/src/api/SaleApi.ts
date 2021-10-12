import api from 'utils/api';
import axios, { AxiosError, AxiosResponse, CancelTokenSource } from 'axios';

import Isale, { ISaleItem } from 'interfaces/Sales';
import ISales from 'interfaces/Sales';

class SaleApi {
	private token?: CancelTokenSource;

	async createSale(saleData: Isale, authToken: string): Promise<AxiosResponse<any>> {
		this.token = axios.CancelToken.source();
		try {
			return await api.post('/sale/new', saleData, {cancelToken: this.token.token, headers: {'token': authToken}});
		}
		catch(error) {
			return (error as AxiosError)?.response as AxiosResponse<any>;
		}
	}

	async getSales(authToken: string): Promise<AxiosResponse<ISales[]>> {
		this.token = axios.CancelToken.source();
		try {
			return await api.get('/sale', {cancelToken: this.token.token, headers: {'token': authToken}});
		}
		catch(error) {
			return (error as AxiosError)?.response as AxiosResponse<ISales[]>;
		}
	}

	async getSaleById(id: string, authToken: string): Promise<AxiosResponse<Isale>> {
		this.token = axios.CancelToken.source();
		try {
			return await api.get('/sale/'+id, {cancelToken: this.token.token, headers: {'token': authToken}});
		}
		catch(error) {
			return (error as AxiosError)?.response as AxiosResponse<Isale>;
		}
	}

	async getSaleItemsById(id: string, authToken: string): Promise<AxiosResponse<ISaleItem[]>> {
		this.token = axios.CancelToken.source();
		try {
			return await api.get('/sale/'+id+'/items', {cancelToken: this.token.token, headers: {'token': authToken}});
		}
		catch(error) {
			return (error as AxiosError)?.response as AxiosResponse<ISaleItem[]>;
		}
	}

	async deleteSaleById(id: string, authToken: string): Promise<AxiosResponse<any>> {
		this.token = axios.CancelToken.source();
		try {
			return await api.delete('/sale/'+id, {cancelToken: this.token.token, headers: {'token': authToken}});
		}
		catch(error) {
			return (error as AxiosError)?.response as AxiosResponse<any>;
		}
	}

	cancel(): void {
		if(typeof this.token !== 'undefined') this.token.cancel();
	}
}

export default new SaleApi();