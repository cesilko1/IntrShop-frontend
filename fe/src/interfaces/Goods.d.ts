export default interface IGoods {
	name: string;
	sellPrice: number;
	buyPrice: number;
	inStock: number;
	lost: number;
}

export interface IGoodsUpdate {
	name?: string;
	sellPrice?: number;
	buyPrice?: number;
	inStock?: number;
	lost?: number;
}