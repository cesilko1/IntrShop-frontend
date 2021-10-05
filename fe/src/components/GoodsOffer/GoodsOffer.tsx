import React, {useState, useEffect, useCallback, useContext} from "react";
import GoodsOfferItem from 'components/GoodsOfferItem/GoodsOfferItem';
import TokenContext from "contexts/TokenContext";
import IGoods from "interfaces/Goods";
import GoodsApi from "api/GoodsApi";

const GoodsOffer: React.FC = () => {
	const [itemsData, setItemsData] = useState<IGoods[]>([]);
	const token = useContext(TokenContext)[1];

	useEffect(()=>{
		LoadData();
	}, []);

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