import api from 'utils/api';
import axios, { AxiosError, AxiosResponse, CancelTokenSource } from 'axios';

import IGoods, { IGoodsUpdate } from 'interfaces/Goods';

class GoodsApi {
	private token?: CancelTokenSource;

	async getGoods(authToken: string): Promise<AxiosResponse<IGoods[] | any>> {
		this.token = axios.CancelToken.source();
		try {
			return await api.get('/goods', {cancelToken: this.token.token, headers: {'token': authToken}});
		}
		catch(error) {
			return (error as AxiosError)?.response as AxiosResponse<IGoods[] | any>;
		}
	}

	async addNewGoods(newGoods: IGoods, authToken: string): Promise<AxiosResponse<any>> {
		this.token = axios.CancelToken.source();
		try {
			return await api.post('/goods/new', newGoods, {cancelToken: this.token.token, headers: {'token': authToken}});
		}
		catch(error) {
			return (error as AxiosError)?.response as AxiosResponse<any>;
		}
	}

	async updateGoodsById(id: string, goodsUpdate: IGoodsUpdate, authToken: string): Promise<AxiosResponse<any>> {
		this.token = axios.CancelToken.source();
		try {
			return await api.put('/goods/'+id, goodsUpdate, {cancelToken: this.token.token, headers: {'token': authToken}});
		}
		catch(error) {
			return (error as AxiosError)?.response as AxiosResponse<any>;
		}
	}

	async getGoodsById(id: string, authToken: string): Promise<AxiosResponse<IGoods>> {
		this.token = axios.CancelToken.source();
		try {
			return await api.get('/goods/'+id, {cancelToken: this.token.token, headers: {'token': authToken}});
		}
		catch(error) {
			return (error as AxiosError)?.response as AxiosResponse<IGoods>;
		}
	}

	async deleteGoodsById(id: string, authToken: string): Promise<AxiosResponse<IGoods>> {
		this.token = axios.CancelToken.source();
		try {
			return await api.delete('/goods/'+id, {cancelToken: this.token.token, headers: {'token': authToken}});
		}
		catch(error) {
			return (error as AxiosError)?.response as AxiosResponse<IGoods>;
		}
	}


	cancel(): void {
		if(typeof this.token !== 'undefined') this.token.cancel();
	}
}

export default new GoodsApi();