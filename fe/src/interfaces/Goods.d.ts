export default interface IGoods {
	_id?: string;
	name: string;
	sellPrice: number;
	buyPrice: number;
	inStock: number;
	lost: number;
	sold: number;
}

export interface IGoodsUpdate {
	name?: string;
	sellPrice?: number;
	buyPrice?: number;
	inStock?: number;
	lost?: number;
}