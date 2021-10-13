import ICartData from 'interfaces/CartData';
import { ISaleItem } from 'interfaces/Sales';

class CartStorage {
	private cartItemName: string = 'cart';

	
	private saveData(data: ICartData[]) {
		localStorage.setItem(this.cartItemName, JSON.stringify(data));
	}
	
	getCurrentData(): ICartData[] {
		if(!localStorage.getItem(this.cartItemName)) return [];

		return JSON.parse(localStorage.getItem(this.cartItemName) as string);
	}

	getCurrentPrice(): number {
		const data = this.getCurrentData();
		var price: number = 0;

		for(var i=0; i<data.length; i+=1) {
			price += (data[i].price || data[i].item.sellPrice) * data[i].count;
		}

		return price;
	}

	getDataForSale(): ISaleItem[] {
		const data = this.getCurrentData();
		const saleData: ISaleItem[] = [];

		for(var i = 0; i < data.length; i += 1) {
			const newItem = data[i].price ? {item: data[i].item._id as string, count: data[i].count, price: data[i].price} : {item: data[i].item._id as string, count: data[i].count}
			saleData.push(newItem);
		}

		return saleData;
	}

	addToCart(item: ICartData) {
		const data = this.getCurrentData();

		for(var i=0; i<data.length; i+=1) {
			if(data[i].item._id === item.item._id) return false;
		}

		data.push(item);

		this.saveData(data);
	}

	deleteById(id: string) {
		const data = this.getCurrentData();
		const newData: ICartData[] = [];

		for(var i=0; i<data.length; i+=1) {
			if(data[i].item._id !== id) newData.push(data[i]);
		}

		this.saveData(newData);
	}

	setCountById(id: string, count: number) {
		if(count <= 0) return;

		const data = this.getCurrentData();
		const newData: ICartData[] = [];

		for(var i=0; i<data.length; i+=1) {
			if(data[i].item._id !== id) {newData.push(data[i]); continue;}

			newData.push({...data[i], count: count});
		}

		this.saveData(newData);
	}

	clear() {
		localStorage.removeItem(this.cartItemName);
	}
}

export default new CartStorage();