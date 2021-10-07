import IGoods from 'interfaces/Goods';
import {useState, createContext} from 'react';

export const GoodsUpdateContext = createContext<any | null>(null);


export const GoodsUpdateProvider = (props: any) => {
	const [goodsUpdate, setGoodsUpdate] = useState<IGoods | undefined>();

	return(
		<GoodsUpdateContext.Provider value={[goodsUpdate, setGoodsUpdate]}>
			{props.children}
		</GoodsUpdateContext.Provider>
	);
}

export default GoodsUpdateContext;