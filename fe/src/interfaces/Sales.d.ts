export default interface ISales {
	price: number;
	date: Date;
	card: boolean;
	items: ISaleItem[];
}

export interface ISaleItem {
	item: string;
	count: number;
	price?: number;
}