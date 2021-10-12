import IGoods from "interfaces/Goods";

export default interface ISales {
	_id?: string;
	price?: number;
	date?: Date;
	card: boolean;
	items: ISaleItem[];
}

export interface ISaleItem {
	item: string;
	count: number;
	price?: number;
}

export interface ISaleDetail {
	goods: IGoods;
	count: number;
	price: number;
}