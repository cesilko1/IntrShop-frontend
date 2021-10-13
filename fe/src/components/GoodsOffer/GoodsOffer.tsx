import React, {useState, useEffect, useContext } from "react";
import GoodsOfferItem from 'components/GoodsOfferItem/GoodsOfferItem';
import TokenContext from "contexts/TokenContext";
import GoodsInCartContext from "contexts/GoodsInCart";
import IGoods from "interfaces/Goods";
import GoodsApi from "api/GoodsApi";
import { FormControl } from "react-bootstrap";

const GoodsOffer: React.FC = () => {
	const [goodsInCart,] = useContext(GoodsInCartContext);
	const [itemsData, setItemsData] = useState<IGoods[]>([]);
	const [token,] = useContext(TokenContext);
	const [searchBy, setSearchBy] = useState<string>("");

	useEffect(()=>{
		LoadData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(()=>{
		LoadData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [goodsInCart]);

	const LoadData = async () => {
		const response = await GoodsApi.getGoods(token);
		setItemsData(response.data);
	}

	const HandleSearch = (searchString: string) => {
		setSearchBy(searchString);
		if(searchString === '') return LoadData();

		setItemsData([...itemsData].filter(o=>o.name.toLowerCase().includes(searchString)));
	}

	return(
		<>
			<FormControl
				placeholder="Vyhledat"
				size="sm"
				className="w-50"
				type="text"
				value={searchBy}
				onChange={e=>HandleSearch(e.target.value)}
			/>
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