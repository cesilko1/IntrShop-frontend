import React, {useState, useEffect, useContext} from "react";
import GoodsOfferItem from 'components/GoodsOfferItem/GoodsOfferItem';
import TokenContext from "contexts/TokenContext";
import GoodsInCartContext from "contexts/GoodsInCart";
import IGoods from "interfaces/Goods";
import GoodsApi from "api/GoodsApi";

const GoodsOffer: React.FC = () => {
	const [goodsInCart,] = useContext(GoodsInCartContext);
	const [itemsData, setItemsData] = useState<IGoods[]>([]);
	const token = useContext(TokenContext)[1];

	useEffect(()=>{
		LoadData();
	}, []);

	useEffect(()=>{
		LoadData();
	}, [goodsInCart]);

	const LoadData = async () => {
		const response = await GoodsApi.getGoods(token);
		setItemsData(response.data);
	}

	return(
		<>
			{
				itemsData.map((item, key)=>{
					return(
						<GoodsOfferItem itemData={item} key={key}/>		
					);
				})
			}
		</>
	);
}

export default GoodsOffer;