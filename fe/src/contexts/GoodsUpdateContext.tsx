import {useState, createContext} from 'react';

export const GoodsUpdateContext = createContext<any | null>(null);


export const GoodsUpdateProvider = (props: any) => {
	const [goodsUpdate, setGoodsUpdate] = useState<boolean>(false);

	return(
		<GoodsUpdateContext.Provider value={[goodsUpdate, setGoodsUpdate]}>
			{props.children}
		</GoodsUpdateContext.Provider>
	);
}

export default GoodsUpdateContext;