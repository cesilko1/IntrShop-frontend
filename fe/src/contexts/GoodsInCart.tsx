import ICartData from 'interfaces/CartData';
import {useState, createContext} from 'react';

export const GoodsInCartContext = createContext<any | null>(null);


export const GoodsInCartProvider = (props: any) => {
	const [goodsInCart, setGoodsInCart] = useState<ICartData[]>([]);

	return(
		<GoodsInCartContext.Provider value={[goodsInCart, setGoodsInCart]}>
			{props.children}
		</GoodsInCartContext.Provider>
	);
}

export default GoodsInCartContext;