import IGoods from 'interfaces/Goods';

export default interface ICartData {
	item: IGoods;
	count: number;
	price?: number;
}