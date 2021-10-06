import {useState, createContext} from 'react';

export const GoodsInCartContext = createContext<any | null>(null);


export const GoodsInCartProvider = (props: any) => {
	const [goodsInCart, setGoodsInCart] = useState<boolean>(false);

	return(
		<GoodsInCartContext.Provider value={[goodsInCart, setGoodsInCart]}>
			{props.children}
		</GoodsInCartContext.Provider>
	);
}

export default GoodsInCartContext;